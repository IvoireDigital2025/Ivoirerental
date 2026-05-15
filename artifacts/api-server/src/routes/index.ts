import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingRouter from "./booking";
import applicationRouter from "./application";

const router: IRouter = Router();

router.use(healthRouter);
router.use('/booking', bookingRouter);
router.use(applicationRouter);

export default router;
