import { Request, Response } from "express";
import { IAddOnDocument } from "../types/types";
import {v2 as cloudinary} from 'cloudinary';
import { AddOn } from "../models";

    //Add new addon items
export const addAddOnItem =async (req: Request, res: Response) => {
  try {
    const addonData: IAddOnDocument = req.body;
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
      addonData.imageUrl = results;
      console.log(results)
      console.log(addonData)
      const newAddon = await new AddOn({ ...addonData, price: JSON.parse(req.body.price), createdBy: req.user?.id });
      const savedAddon = newAddon.save();
      res.status(200).json({status: 200, addon:savedAddon});

    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  };

    //Get all addon items
export const getAllAddOnItems =async (_: Request, res: Response) => {
    const addOn = await AddOn.find();
    res.status(200).json({status:200, addon:addOn});
  };


  // Get a addon item by ID
export const getAddOnItemById =async (req: Request, res: Response) => {
    const addon = await AddOn.findById(req.params.id);
    if (!addon) {
      res.status(404).json({ error: 'AddOn Item Not found' });
      return;
    }
    res.json(addon);
  };


  // Update a addon item by ID
export const updateAddOnItemById =async (req: Request, res: Response) => {
  try {
    const addonData: IAddOnDocument = req.body;
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
        addonData.imageUrl = results;
        const updatedAddon = await AddOn.findByIdAndUpdate(
          req.params.id,
          addonData,
          { new: true }
        );
        if (!updatedAddon) {
          res.status(404).json({ error: 'Addon not found' });
          return;
        }
        res.status(200).json({status: 200,addon: updatedAddon})  
      });
    }
    else{
      const updatedAddon = await AddOn.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedAddon) {
        res.status(404).json({ error: 'Addon not found' });
        return;
      }
      res.status(200).json({status: 200,addon: updatedAddon});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }





    const updatedAddOn = await AddOn.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedAddOn) {
        res.status(404).json({ error: 'Addon not found' });
        return;
      }
      res.json(updatedAddOn);
  };


    // Delete a addon item by ID
export const deleteAddOnItemById =async (req: Request, res: Response) => {
    const deletedAddOn = await AddOn.findByIdAndDelete(req.params.id);
    if (!deletedAddOn) {
      res.status(404).json({ error: 'Addon not found' });
      return;
    }
    res.json({status:200, addon:deletedAddOn});
  };