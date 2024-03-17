import mongoose from "mongoose";
import { IMenuDocument } from "../types/types";
import { model } from "mongoose";
let Schema = mongoose.Schema;

let menuSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    isFeatured: {type: Boolean},
    price: {type: Number},
    quantity: {type: Number},
    imageUrl: {type: String},
    flavours: {type: [String]},
    createdBy: {
        type: Schema.Types.ObjectId, ref: "User"
     },
    image: {type: String},
    createdAt: {type: Date, default: Date.now()}
});

const Menu = model<IMenuDocument>("Menu", menuSchema);

export default Menu;