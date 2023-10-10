import "dotenv/config.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./routes/users.js";
import { ProductRouter } from "./routes/products.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", UserRouter);
app.use("/products", ProductRouter);

mongoose.connect(process.env.MONGO_DB);

app.listen(process.env.PORT, () => console.log("server started"));
