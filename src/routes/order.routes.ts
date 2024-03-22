import { Router } from "express";
import { catchErrors } from "../middleware/error.middleware";
import { verifyIsAdmin, verifyToken } from "../middleware/auth.middleware";
import { getAllOrders, createOrder, getOrderById, deleteOrderById, updateOrderById, getUsersOrder } from "../controllers/order.controller";
const router: Router = Router();

//Get all order items
router.get("/",verifyToken, catchErrors(getAllOrders));
//Get order item By id
router.get("/:id",verifyToken, catchErrors(getOrderById));
//Get order item By id
router.get("/user/:id",verifyToken, catchErrors(getUsersOrder));
//Add order items
router.post("/",verifyToken, catchErrors(createOrder));
//Update order item by id
router.put("/:id",verifyToken, verifyIsAdmin, catchErrors(updateOrderById));
//Delete order items By id
router.delete("/:id",verifyToken, verifyIsAdmin, catchErrors(deleteOrderById));

export default router;
