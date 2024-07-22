import mongoose, { Document, Schema } from "mongoose";
import { IMenuDocument } from "../types/types";

// Define interface for variations

// Define mongoose schema for menu
const menuSchema = new Schema<IMenuDocument>({
  name: { type: String, required: true },
  description: { type: String },
  sizes: [
    {
      size: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  quantities: [
    {
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  flavours: [{ type: String }],
  category: { type: String },
  isFeatured: { type: Boolean },
  price: { type: Number },
  quantity: { type: Number },
  imageUrl: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

// Define mongoose schema for variations

// Define model
const Menu = mongoose.model<IMenuDocument>("Menu", menuSchema);

export default Menu;
