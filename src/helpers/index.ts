import  User from "../models/user.model";
import validator from "validator";

export const userFind = (data: object) => User.findOne(data);

export const userExists = (email: string) => User.exists({ email });

export const validateEmail = (email: string) => validator.isEmail(email);

export const isAdmin = async (id: string) => {
  const user = await User.findOne({ _id: id, role: { $in: ['admin', 'superadmin'] } });
  return !!user;
};