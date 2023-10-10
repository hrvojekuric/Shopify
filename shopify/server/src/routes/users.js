import "dotenv/config.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/Users.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (user) {
      res.status(400).json({ message: "Username already exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully." });
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
});

router.post("/login", async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  try {
    if (!user) {
      res.status(401).json({ message: "Username or password is incorrect." });
    } else {
      const validatePassword = await bcrypt.compare(password, user.password);
      if (!validatePassword) {
        res.status(401).json({ message: "Username or password is incorrect." });
      } else {
        const token = jwt.sign({ id: user._id }, jwtSecret);
        res.status(200).json({ token, userID: user._id, role: user.role });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/getUsersDocuments", async (_, res) => {
  try {
    const data = await userModel.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/grant-admin/:userId", verifyToken, async (req, res) => {
  const idOfUser = req.params.userId;
  try {
    const userToGrantAdminRights = await userModel.findOne({ _id: idOfUser });
    if (!userToGrantAdminRights) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userToGrantAdminRights.role === "user") {
      userToGrantAdminRights.role = "admin";
    } else {
      userToGrantAdminRights.role = "user";
    }

    await userToGrantAdminRights.save();

    res.status(200).json({ message: "Admin rights granted successfully." });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong." });
  }
});

export { router as UserRouter };
