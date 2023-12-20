import mongoose from "mongoose";
import { model } from "mongoose";
import { IAddOnDocument } from "../types/types";

let Schema = mongoose.Schema;
let addOnSchema = new Schema({
    name: { type: String },
    description: { type: String },
    category: { type: String },
    price: {type: Number},
    createdBy: {
        type: Schema.Types.ObjectId, ref: "User"
     },
});

const AddOn = model<IAddOnDocument>("AddOn", addOnSchema);

export default AddOn;