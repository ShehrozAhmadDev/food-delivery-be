import { Request, Response } from "express";

//get home
export const getHome = async (_req: Request, res: Response) => {
  return res.status(200).send("Welcome to Home");
};
