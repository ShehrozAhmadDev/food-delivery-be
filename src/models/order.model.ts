import mongoose from "mongoose";
import { Order_Status } from "../types/enums";
import { model } from "mongoose";
import { IOrderDocument } from "../types/types";
let Schema = mongoose.Schema;

let orderSchema = new Schema({
  startTime: { type: Date },
  endTime: { type: Date },
  address: { type: String },
  phone: { type: String },
  city: { type: String },
  price: { type: Number },
  status: {
    type: String,
    enum: [Order_Status.DELIVERED, Order_Status.ON_ROUTE, Order_Status.PENDING],
    default: Order_Status.PENDING,
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      size: { type: String, required: true },
      flavor: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  addOns: [
    {
      addOn: { type: mongoose.Schema.Types.ObjectId, ref: "AddOn" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = model<IOrderDocument>("Order", orderSchema);

export default Order;
