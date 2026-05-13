import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingRouter from "./booking";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use('/booking', bookingRouter);
router.use('/admin', adminRouter);

export default router;
