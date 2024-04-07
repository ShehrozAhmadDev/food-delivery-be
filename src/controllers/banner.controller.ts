import { Request, Response } from "express";
import { IBannerDocument } from "../types/types";
import {v2 as cloudinary} from 'cloudinary';
import Banner from "../models/banner.model";

    //Add new banner items
    export const addBanner = async (req: Request, res: Response): Promise<void> => {
      try {
        console.log("HERE")
        const bannerData: IBannerDocument = req.body;
        const files: any = req.file;
        console.log(files)
        const thumbnailFile = req.file && files ? files : undefined;
    
        if (!thumbnailFile) {
          res.status(400).json({ error: 'Thumbnail file is required' });
          return;
        }
    
        const thumbnailUploadResult = await cloudinary.uploader.upload(thumbnailFile.path, {
          public_id: thumbnailFile.filename,
        });
    
        const thumbnailUrl = thumbnailUploadResult.secure_url;
        console.log(thumbnailUrl)
        bannerData.imageUrl = thumbnailUrl;
    
        const newBanner = new Banner({ ...bannerData, createdBy: req.user?.id });
        const savedBanner = await newBanner.save();
    
        res.status(200).json({ status: 200, banner: savedBanner });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };


    export const getAllBannerItems =async (_: Request, res: Response) => {
        const banners = await Banner.find();
        res.status(200).json({status: 200, banner: banners});
      };
    


      

  // Update a banner item by ID
export const updateBannerItemById =async (req: Request, res: Response) => {
    console.log(req.body)
    try {
      const bannerData: IBannerDocument = req.body;
      const files: any = req.file;
      if(files){

        const thumbnailFile = req.file && files ? files : undefined;
    
        if (!thumbnailFile) {
          res.status(400).json({ error: 'Thumbnail file is required' });
          return;
        }
    
        const thumbnailUploadResult = await cloudinary.uploader.upload(thumbnailFile.path, {
          public_id: thumbnailFile.filename,
        });
    
        const thumbnailUrl = thumbnailUploadResult.secure_url;
        console.log(thumbnailUrl)
        bannerData.imageUrl = thumbnailUrl;

       
          const updatedbanner = await Banner.findByIdAndUpdate(
            req.params.id,
            bannerData,
            { new: true }
          );
          if (!updatedbanner) {
            res.status(404).json({ error: 'banner not found' });
            return;
          }
          res.status(200).json({status: 200,banner: updatedbanner})  
      }
      else{
        const updatedbanner = await Banner.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!updatedbanner) {
          res.status(404).json({ error: 'banner not found' });
          return;
        }
        res.status(200).json({status: 200,banner: updatedbanner});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
      // Delete a banner item by ID
  export const deleteBannerItemById =async (req: Request, res: Response) => {
      const deletedbanner = await Banner.findByIdAndDelete(req.params.id);
      if (!deletedbanner) {
        res.status(404).json({ error: 'banner not found' });
        return;
      }
      res.status(200).json({banner:deletedbanner, status: 200});
    };