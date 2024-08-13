import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";
dotenv.config();

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use('/',usersRoute)

mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });