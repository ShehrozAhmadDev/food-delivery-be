import { Types, Document } from "mongoose";

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

export interface IUserDocument extends userI, Document, ITimestamps {
  comparePassword(password: string): Promise<boolean>;
  getToken(): string;
  verified: boolean;
  role: string;
}

export interface IVariations {
  flavour: string;
  sizes: { size: string; price: number }[];
}

export interface IMenuDocument extends Document, ITimestamps {
  name: string;
  description: string;
  category: string;
  isFeatured: boolean;
  quantity: number;
  price: number;
  variations: IVariations[];
  createdBy: mongoose.Types.ObjectId;
  imageUrl: string;
}

export interface IBannerDocument extends Document, ITimestamps {
  imageUrl: string;
}
export interface IAddOnDocument extends Document, ITimestamps {
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  createdBy: mongoose.Types.ObjectId;
}

export interface IOrderDocument extends Document, ITimestamps {
  startTime: Date;
  endTime: Date;
  address: string;
  phone: string;
  price: number;
  status: string;
  items: {
    menuItemId: mongoose.Types.ObjectId;
    quantity: number;
    addOns: { addOnId: mongoose.Types.ObjectId; quantity: number }[];
  }[];
  createdBy: mongoose.Types.ObjectId;
}

export interface IOrders extends Document, ITimestamps {
  categoryId: Types.ObjectId;
}

export interface JwtPayload {
  id: string;
}
