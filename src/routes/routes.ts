import { Router } from "express";
import homeRoutes from "./home.routes";

const router: Router = Router();

//Auth Routes
router.use("/home", homeRoutes);

export default router;
