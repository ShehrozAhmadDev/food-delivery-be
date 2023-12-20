import { Request, Response } from "express";
import { IAddOnDocument } from "../types/types";
import { AddOn } from "../models";

    //Add new addon items
export const addAddOnItem =async (req: Request, res: Response) => {
      const addonData: IAddOnDocument = req.body;
      const newAddon = await AddOn.create(addonData);
      res.status(200).json(newAddon);
  };

    //Get all addon items
export const getAllAddOnItems =async (_: Request, res: Response) => {
    const addOn = await AddOn.find();
    res.status(200).json(addOn);
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
    res.json(deletedAddOn);
  };