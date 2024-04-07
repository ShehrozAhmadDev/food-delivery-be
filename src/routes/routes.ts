import { Router } from "express";
import authRoutes from "./auth.routes";
import profileRoutes from "./profile.routes";
import menuRoutes from "./menu.routes";
import addonRoutes from "./addon.routes";
import orderRoutes from "./order.routes";
import bannerRoutes from "./banner.routes";


const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/menu", menuRoutes);
router.use("/addon", addonRoutes);
router.use("/order", orderRoutes);
router.use("/banner", bannerRoutes);

export default router;
