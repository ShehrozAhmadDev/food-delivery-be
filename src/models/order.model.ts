import mongoose from "mongoose";
import { Order_Status } from "../types/enums";
import { model } from "mongoose";
import { IOrderDocument } from "../types/types";
let Schema = mongoose.Schema;

let orderSchema = new Schema({
    startTime: { type: Date },
    endTime: { type: Date },
    address: {type: String},
    phone: {type: String},
    city: {type: String},
    price: {type: Number},
    status: {
        type: String, enum: [Order_Status.DELIVERED, Order_Status.ON_ROUTE, Order_Status.PENDING],
        default: Order_Status.PENDING
    },
    items: [
        {
          menuItemId:{type: Schema.Types.ObjectId, ref: "Menu"},
          quantity: {type: Number},
          addOns: [
            {
              addOnId: {type: Schema.Types.ObjectId, ref: "AddOn"},
              quantity: {type: Number},
            }
          ]
        }
      ],
      createdBy: {
        type: Schema.Types.ObjectId, ref: "User"
     },
});

const Order = model<IOrderDocument>("Order", orderSchema);

export default Order;