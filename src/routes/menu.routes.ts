import { Router } from "express";
import { addMenuItem, deleteMenuItemById, getAllMenuItems, getMenuItemById, updateMenuItemById } from "../controllers/menu.controller";
import { catchErrors } from "../middleware/error.middleware";
import { verifyIsAdmin, verifyToken } from "../middleware/auth.middleware";
const router: Router = Router();

//Get all menu items
router.get("/",verifyToken, catchErrors(getAllMenuItems));
//Get menu item By id
router.get("/:id",verifyToken, catchErrors(getMenuItemById));
//Add menu items
router.post("/",verifyToken, verifyIsAdmin, catchErrors(addMenuItem));
//Update menu item by id
router.put("/:id",verifyToken, verifyIsAdmin, catchErrors(updateMenuItemById));
//Delete menu items By id
router.delete("/:id",verifyToken, verifyIsAdmin, catchErrors(deleteMenuItemById));

export default router;
