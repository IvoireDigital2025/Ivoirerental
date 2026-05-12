import { Router } from 'express';
import { Pool } from 'pg';
import { getUncachableStripeClient, getStripePublishableKey } from '../stripeClient';

const router = Router();

function getPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL });
}

const CARS: Record<string, { name: string; priceCents: number }> = {
  camry:  { name: 'Toyota Camry SE',  priceCents: 32000 },
  sonata: { name: 'Hyundai Sonata',   priceCents: 35000 },
  crv:    { name: 'Honda CR-V SUV',   priceCents: 38000 },
};

router.get('/cars', async (_req, res) => {
  const pool = getPool();
  try {
    const { rows } = await pool.query(
      'SELECT car_key, car_name, available FROM car_availability ORDER BY id'
    );
    const cars = rows.map((r: any) => ({
      key: r.car_key,
      name: r.car_name,
      available: r.available,
      priceCents: CARS[r.car_key]?.priceCents ?? 32000,
    }));
    res.json({ cars });
  } finally {
    await pool.end();
  }
});

router.get('/stripe-key', async (_req, res) => {
  const publishableKey = await getStripePublishableKey();
  res.json({ publishableKey });
});

router.post('/checkout', async (req, res) => {
  const { carKey, customerName, customerEmail, customerPhone } = req.body;

  if (!carKey || !customerName || !customerEmail || !customerPhone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const car = CARS[carKey];
  if (!car) return res.status(400).json({ error: 'Invalid car selection' });

  const pool = getPool();
  try {
    const { rows } = await pool.query(
      'SELECT available FROM car_availability WHERE car_key = $1',
      [carKey]
    );
    if (!rows[0]?.available) {
      return res.status(409).json({ error: 'This vehicle is no longer available' });
    }

    const stripe = await getUncachableStripeClient();
    const baseUrl = `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: car.priceCents,
          product_data: {
            name: `${car.name} — Weekly Rental`,
            description: 'Ivoire Rental · Dallas–Fort Worth · Commercial insurance included',
          },
        },
        quantity: 1,
      }],
      customer_email: customerEmail,
      metadata: { carKey, customerName, customerPhone },
      success_url: `${baseUrl}/?booking=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?booking=cancelled`,
    });

    await pool.query(
      `INSERT INTO bookings (car_name, car_price_cents, customer_name, customer_email, customer_phone, stripe_session_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')`,
      [car.name, car.priceCents, customerName, customerEmail, customerPhone, session.id]
    );

    res.json({ url: session.url });
  } finally {
    await pool.end();
  }
});

router.post('/webhook-confirm', async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });

  const stripe = await getUncachableStripeClient();
  const pool = getPool();
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const carKey = session.metadata?.carKey;
    if (!carKey) return res.status(400).json({ error: 'Missing car info' });

    await pool.query(
      `UPDATE bookings SET status = 'paid', stripe_payment_intent_id = $1 WHERE stripe_session_id = $2`,
      [session.payment_intent as string, sessionId]
    );

    await pool.query(
      `UPDATE car_availability SET available = false, updated_at = NOW() WHERE car_key = $1`,
      [carKey]
    );

    res.json({ success: true });
  } finally {
    await pool.end();
  }
});

export default router;
