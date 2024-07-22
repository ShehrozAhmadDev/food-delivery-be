import { Types, Document } from "mongoose";
import mongoose from "mongoose";
declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
interface userI {
  fullName: string;
  email: string;
  password: string;
}

export interface IUserDocument extends userI, Document {
  comparePassword(password: string): Promise<boolean>;
  getToken(): string;
  verified: boolean;
  role: string;
}

export interface IVariations {
  flavour: string;
  sizes: { size: string; price: number }[];
}

export interface IMenuDocument extends Document {
  name: string;
  description: string;
  category: string;
  isFeatured: boolean;
  sizes: { size: string; price: number }[];
  quantities: { quantity: string; price: number }[];
  flavours: string[];
  quantity: number;
  price: number;
  createdBy: mongoose.Types.ObjectId;
  imageUrl: string;
}

export interface IBannerDocument extends Document {
  imageUrl: string;
}
export interface IAddOnDocument extends Document {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  createdBy: mongoose.Types.ObjectId;
}

export interface IOrderDocument extends Document {
  startTime: Date;
  endTime: Date;
  address: string;
  phone: string;
  price: number;
  status: string;
  items: {
    menuItem: mongoose.Types.ObjectId;
    quantity: number;
    addOns: { addOn: mongoose.Types.ObjectId; quantity: number }[];
  }[];
  createdBy: mongoose.Types.ObjectId;
}

export interface IOrders extends Document {
  categoryId: Types.ObjectId;
}

export interface JwtPayload {
  id: string;
}
