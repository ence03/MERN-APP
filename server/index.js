import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
//routes
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const db = process.env.MONGO_URI;

mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(port, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
