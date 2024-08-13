import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import listings from "./routes/listings.js";

dotenv.config();

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/listings", listings);

//connect to db
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`DB connected and listening on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
