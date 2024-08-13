import express from "express";
import mongoose from "mongoose";

import dotenv from 'dotenv'
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";


import listings from "./routes/listings.js";
import reservations from "./routes/reservations.js";

dotenv.config();

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());


//routes
app.use("/api/listings", listings);
app.use("/api/reservations", reservations);
app.use('/api/users',usersRoute)

mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(DB connected and listening on ${process.env.PORT});
    });
  })
  .catch((error) => {
    console.log(error);
  });
