import { Request, Response } from "express";
import { IMenuDocument } from "../types/types";
import { Menu } from "../models";
import {v2 as cloudinary} from 'cloudinary';

    //Add new menu items
    export const addMenuItem = async (req: Request, res: Response): Promise<void> => {
      try {
        const menuData: IMenuDocument = req.body;
        const thumbnailPromise = new Promise(async(resolve) => {
          const files: any = req.files;
          const thumbnailFile = req.files && files ? files['thumbnail'][0] : undefined;
          if (!thumbnailFile) {
            res.status(400).json({ error: 'Thumbnail file is required' });
            return;
          }
          await cloudinary.uploader.upload(thumbnailFile.path, {
            public_id: thumbnailFile.filename,
          }).then((data: { secure_url: string; }) => {
                resolve(data.secure_url);
              })
              .catch((err: any) => {
                console.log(err);
              });
        });
        Promise.resolve(thumbnailPromise)
        .then(async (results: any) => {
          menuData.imageUrl = results;
          console.log(results)
          console.log(menuData)
          const newMenu = await new Menu({ ...menuData, isFeatured: false, price: JSON.parse(req.body.price), createdBy: req.user?.id });
          const savedMenu = newMenu.save();
          res.status(200).json({status: 200, menu:savedMenu});

        });
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

    //Get all menu items
export const getAllMenuItems =async (_: Request, res: Response) => {
    const menus = await Menu.find();
    res.status(200).json({status: 200, menu: menus});
  };


  // Get a menu item by ID
export const getMenuItemById =async (req: Request, res: Response) => {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      res.status(404).json({ error: 'Menu Item Not found' });
      return;
    }
    res.json({status: 200, menuItems: menu});
  };


  // Update a menu item by ID
export const updateMenuItemById =async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const menuData: IMenuDocument = req.body;
    const files: any = req.files;
    if(files && files["thumbnail"]){
      const thumbnailPromise = new Promise(async(resolve) => {
        const thumbnailFile = req.files && files ? files['thumbnail'][0] : undefined;
        if (!thumbnailFile) {
          res.status(400).json({ error: 'Thumbnail file is required' });
          return;
        }
        await cloudinary.uploader.upload(thumbnailFile.path, {
          public_id: thumbnailFile.filename,
        }).then((data: { secure_url: string; }) => {
              resolve(data.secure_url);
            })
            .catch((err: any) => {
              console.log(err);
            });
      });
      Promise.resolve(thumbnailPromise)
      .then(async (results: any) => {
        menuData.imageUrl = results;
        const updatedMenu = await Menu.findByIdAndUpdate(
          req.params.id,
          menuData,
          { new: true }
        );
        if (!updatedMenu) {
          res.status(404).json({ error: 'Menu not found' });
          return;
        }
        res.status(200).json({status: 200,menu: updatedMenu})  
      });
    }
    else{
      const updatedMenu = await Menu.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedMenu) {
        res.status(404).json({ error: 'Menu not found' });
        return;
      }
      res.status(200).json({status: 200,menu: updatedMenu});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


    // Delete a menu item by ID
export const deleteMenuItemById =async (req: Request, res: Response) => {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedMenu) {
      res.status(404).json({ error: 'Menu not found' });
      return;
    }
    res.status(200).json({menu:deletedMenu, status: 200});
  };