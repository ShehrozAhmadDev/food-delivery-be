import mongoose, { Document, Schema } from "mongoose";
import { IMenuDocument } from "../types/types";

// Define interface for variations
interface IMenuVariation {
  flavour: string;
  sizes: { size: number; price: number }[];
}

const menuVariationSchema = new Schema<IMenuVariation>({
  flavour: { type: String },
  sizes: [{ size: { type: String }, price: { type: Number } }],
});

// Define mongoose schema for menu
const menuSchema = new Schema<IMenuDocument>({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  isFeatured: { type: Boolean },
  price: { type: Number },
  quantity: { type: Number },
  imageUrl: { type: String },
  variations: { type: [menuVariationSchema], default: [] },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

// Define mongoose schema for variations

// Define model
const Menu = mongoose.model<IMenuDocument>("Menu", menuSchema);

export default Menu;
