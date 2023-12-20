import { Router } from "express";
import {  addAddOnItem, deleteAddOnItemById, getAddOnItemById, getAllAddOnItems, updateAddOnItemById} from "../controllers/addon.controller";
import { catchErrors } from "../middleware/error.middleware";
import { verifyIsAdmin, verifyToken } from "../middleware/auth.middleware";
const router: Router = Router();

//Get all addon items
router.get("/",verifyToken, catchErrors(getAllAddOnItems));
//Get addon item By id
router.get("/:id",verifyToken, catchErrors(getAddOnItemById));
//Add addon items
router.post("/",verifyToken, verifyIsAdmin, catchErrors(addAddOnItem));
//Update addon item by id
router.put("/:id",verifyToken, verifyIsAdmin, catchErrors(updateAddOnItemById));
//Delete addon items By id
router.delete("/:id",verifyToken, verifyIsAdmin, catchErrors(deleteAddOnItemById));

export default router;
