//! mini express
import express from "express";
import mongoose from "mongoose";
import { Router } from "express";
import { userModel } from "../models/user-model.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
export const userRoutes = Router();
const { sign } = jwt;
//! define routes
//*REGISTER
userRoutes.post("/register", async (req, res) => {
  try {
    let userDetails = req.body;
    let isExist = await userModel.findOne({ email: userDetails.email });
    if (isExist) {
      return res.status(409).json({
        message: "User already exists",
        payload: userDetails,
      });
    }
    let hassedPassword = await hash(userDetails.password, 10);
    userDetails.password = hassedPassword;
    let newUser = new userModel(userDetails);
    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      payload: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: `err in user-api-register route [BACKEND]...${err.message}`,
    });
  }
});

//*LOGIN
userRoutes.post("/login", async (req, res) => {
  try {
    let userDetails = req.body;
    let isExist = await userModel.findOne({ email: userDetails.email });
    if (isExist == null) {
      return res.status(404).json({
        message: "Invalid Email",
        payload: userDetails,
      });
    }

    let ispassword = await compare(userDetails.password, isExist.password);
    if (ispassword == false) {
      return res.status(401).json({
        message: "Invalid password",
        payload: userDetails,
      });
    }

    let token = sign({ payload: userDetails }, "abcde", { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      message: "user logged in successfully",
      payload: { user: userDetails, token: token },
    });
  } catch (err) {
    return res.status(500).json({
      message: `err in user-api-login route [BACKEND]...${err.message}`,
    });
  }
});

//*LOGOUT
userRoutes.post("/logout", verifyToken, (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return res.status(204).json({
      message: "user logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: `err in user-api-logout route [BACKEND]...${err.message}`,
    });
  }
});

//* me route
userRoutes.get("/me", verifyToken, (req, res) => {
  try {
    let user = req.user;
    return res.status(200).json({
      message: "user profile fetched successfully",
      payload: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: `err in user-api-profile route [BACKEND]...${err.message}`,
    });
  }
});
