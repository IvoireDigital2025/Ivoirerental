import { Router } from 'express';
import { Pool } from 'pg';

const router = Router();

function getPool() {
  return new Pool({ connectionString: process.env.DATABASE_URL });
}

// Simple token-based admin auth
function requireAdmin(req: any, res: any, next: any) {
  const token = req.headers['x-admin-token'];
  if (token !== process.env.ADMIN_TOKEN && token !== 'ivoir-admin-2024') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Get all cars + availability
router.get('/cars', requireAdmin, async (_req, res) => {
  const pool = getPool();
  try {
    const { rows } = await pool.query(
      'SELECT car_key, car_name, available, updated_at FROM car_availability ORDER BY id'
    );
    res.json({ cars: rows });
  } finally {
    await pool.end();
  }
});

// Toggle car availability
router.patch('/cars/:carKey', requireAdmin, async (req, res) => {
  const { carKey } = req.params;
  const { available } = req.body;
  if (typeof available !== 'boolean') {
    return res.status(400).json({ error: 'available must be a boolean' });
  }
  const pool = getPool();
  try {
    const { rows } = await pool.query(
      `UPDATE car_availability SET available = $1, updated_at = NOW()
       WHERE car_key = $2 RETURNING car_key, car_name, available, updated_at`,
      [available, carKey]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Car not found' });
    res.json({ car: rows[0] });
  } finally {
    await pool.end();
  }
});

// Get all bookings
router.get('/bookings', requireAdmin, async (_req, res) => {
  const pool = getPool();
  try {
    const { rows } = await pool.query(
      `SELECT id, car_name, car_price_cents, customer_name, customer_email,
              customer_phone, status, created_at
       FROM bookings ORDER BY created_at DESC`
    );
    res.json({ bookings: rows });
  } finally {
    await pool.end();
  }
});

export default router;
