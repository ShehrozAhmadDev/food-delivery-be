import { Request, Response } from "express";
import { IMenuDocument } from "../types/types";
import { Menu } from "../models";

    //Add new menu items
export const addMenuItem =async (req: Request, res: Response) => {
      const menuData: IMenuDocument = req.body;
      const newMenu = await Menu.create({...menuData, createdBy: req.user?.id});
      res.status(200).json(newMenu);
  };

    //Get all menu items
export const getAllMenuItems =async (_: Request, res: Response) => {
    const menus = await Menu.find();
    res.status(200).json(menus);
  };


  // Get a menu item by ID
export const getMenuItemById =async (req: Request, res: Response) => {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      res.status(404).json({ error: 'Menu Item Not found' });
      return;
    }
    res.json(menu);
  };


  // Update a menu item by ID
export const updateMenuItemById =async (req: Request, res: Response) => {
    const updatedMenu = await Menu.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedMenu) {
        res.status(404).json({ error: 'Menu not found' });
        return;
      }
      res.json(updatedMenu);
  };


    // Delete a menu item by ID
export const deleteMenuItemById =async (req: Request, res: Response) => {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenu) {
      res.status(404).json({ error: 'Menu not found' });
      return;
    }
    res.json(deletedMenu);
  };