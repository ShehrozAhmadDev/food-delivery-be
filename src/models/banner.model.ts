import mongoose from "mongoose";
import { model } from "mongoose";
import { IBannerDocument } from "types";
let Schema = mongoose.Schema;

let bannerSchema = new Schema({
    
    imageUrl: {type: String},
    createdBy: {
        type: Schema.Types.ObjectId, ref: "User"
     },
    createdAt: {type: Date, default: Date.now()}
});

const Banner = model<IBannerDocument>("Banner", bannerSchema);

export default Banner