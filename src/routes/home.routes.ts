import { Router } from "express";
import { getHome } from "../controllers/home.controller";
import { catchErrors } from "../middleware/error.middleware";
const router: Router = Router();

//Get Home
router.get("/", catchErrors(getHome));

export default router;
