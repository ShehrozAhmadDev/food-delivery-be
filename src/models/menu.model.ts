import mongoose from "mongoose";
import { IMenuDocument } from "../types/types";
import { model } from "mongoose";
let Schema = mongoose.Schema;

let menuSchema = new Schema({
    name: { type: String },
    description: { type: String },
    category: { type: String },
    isFeatured: {type: Boolean},
    price: {type: Number},
    createdBy: {
        type: Schema.Types.ObjectId, ref: "User"
     },
});

const Menu = model<IMenuDocument>("Menu", menuSchema);

export default Menu;