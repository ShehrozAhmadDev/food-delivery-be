import { Request, Response } from "express";
import { IOrderDocument } from "../types/types";
import { Order } from "../models";

    //Create new order items
export const createOrder =async (req: Request, res: Response) => {
      const orderData: IOrderDocument = req.body;
      const newOrder = await Order.create({...orderData, createdBy: req.user?.id});
      res.status(200).json({status: 200, order:newOrder});
  };

    //Get all orders
export const getAllOrders =async (_: Request, res: Response) => {
  const orders = await Order.find()
      .populate({
        path: 'createdBy',
      })
      .populate('items.menuItemId'
     )
      .populate(
         'items.addOns.addOnId');  
      console.log(orders[0].items)
      
      res.status(200).json(orders);
  };


  // Get a order item by ID
export const getOrderById =async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate({
      path: 'createdBy',
    })
    .populate({
      path: 'items.menuItemId',
      model: 'Menu',
    })
    .populate({
      path: 'items.addOns.addOnId',
      model: 'AddOn',
    }); 
    if (!order) {
      res.status(404).json({ error: 'Order Not found' });
      return;
    }
    res.status(200).json({status: 200, order: order});
  };


  // Get a order item by ID
  export const getUsersOrder =async (req: Request, res: Response) => {
    const order = await Order.find({createdBy: req.params.id}).populate({
      path: 'createdBy',
    })
    .populate({
      path: 'items.menuItemId',
      model: 'Menu',
    })
    .populate({
      path: 'items.addOns.addOnId',
      model: 'AddOn',
    }); 
    if (!order) {
      res.status(404).json({ error: 'Order Not found' });
      return;
    }
    res.status(200).json({status: 200, order: order});
  };





  // Update a order item by ID
export const updateOrderById =async (req: Request, res: Response) => {
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedOrder) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      res.status(200).json({status: 200, order: updatedOrder});
  };


    // Delete a order by ID
export const deleteOrderById =async (req: Request, res: Response) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(deletedOrder);
  };