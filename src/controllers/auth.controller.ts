import { Request, Response } from "express";
import { userFind, userExists, validateEmail } from "../helpers";
import { User } from "../models";
import { hash } from "bcrypt";
import { IUserDocument } from "../types/types";

export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req?.body;

  const user = await userFind({
    email: email.toLowerCase(),
  });
  if (!user) {
    return res.status(401).json({ message: "User not exists on this email" });
  }
  if (!(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Email/Password does not match" });
  }

  const token = await user.getToken();
  return res.status(200).json({
    status: 200,
    message: "Logged In",
    token,
    user: user
  });
};

/**
 * Creates new instance of User in database
 */
export const signUp = async (req: Request, res: Response) => {
  console.log(req.body)
  const {
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  } = req?.body;

  if (await userExists(email)) {
    return res
      .status(500)
      .json({ message: `User already registered with this email ${email}` });
  }

  if (!(await validateEmail(email))) {
    return res
      .status(500)
      .json({ message: "Please enter correct email address" });
  }
  const user = await User.create({
    fullName,
    email,
    password,
  });

  return res.status(200).json({
    status: 200,
    message: `User signed up successfully ${email} `,
    user: user
  });
};

/**
 * Get :Logged In User Profile from database
 */
export const myProfile = async (
  req: Request,
  res: Response
): Promise<Response<IUserDocument>> => {
  const user = await User.findById(req?.user?._id).select("-password");
  return res.status(200).json({ user });
};


export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response<IUserDocument>> => {
  const user = await User.findByIdAndDelete(req?.user?._id);
  return res.status(200).json({ status: 200, user: user });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email }: { email: string } = req?.body;

  if (!(await userExists(email))) {
    return res.status(500).json({
      message: `User with this email ${email} is not exists, please signup`,
    });
  }
  const user = await User.findOne({ email });


  return res.status(200).json({
    status: 200,
    message: `A reset verification link is sent to your email ${email}`,
    user: user
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const user = await userFind({
    email: req?.user?.email.toLowerCase(),
  });
  if (user?.verified) {
    return res.status(500).json({ message: `Your email is already verified` });
  }
  await User.findByIdAndUpdate(req?.user?._id, { verified: true });
  return res
    .status(200)
    .json({ status: 200, message: "User verified successfully!" });
};

export const resetPassword = async (req: Request, res: Response) => {
  if (!req?.body?.password) {
    return res.status(500).json({
      message: `Please enter new password`,
    });
  }
  await User.findOneAndUpdate(
    { email: req?.user?.email },
    {
      $set: {
        password: await hash(req?.body?.password, 10),
      },
    }
  );

  return res
    .status(200)
    .json({ status: 200, message: "Reset password successful!" });
};





/**
 * Update password
 */
export const updateUserPassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if(confirmNewPassword !== newPassword) {
    res.status(200).json({message: "Confrim password does not match with new password"})
  }
  if(req.user && req.user.id){
    const user = await User.findById( req.user.id);
  
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid current password");
    }
    const newPasswordHash = await hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {password: newPasswordHash},{new: true});
    res.status(200).json({status: 200, user:updatedUser});
  }
  else{
    res.status(200).json({message: "User not found"})
  }
};




/**
 * Update user
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  const { fullName } = req.body;
  if(req.user && req.user.id){
    const user = await User.findById( req.user.id);

    if (!user) {
      throw new Error("User not found");
    }
    if (fullName) {
      const updatedUser = await User.findByIdAndUpdate(req.user.id, {fullName: fullName},{new: true});
      res.status(200).json({status: 200,user:updatedUser});
    }    
    else{
      res.status(200).json({status: 200,message:"Fullname not specified"});

    }
  }
};




export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(200).json({status: 200, users: users});
};
