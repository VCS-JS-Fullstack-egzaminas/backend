import express from "express";
import mongoose from "mongoose";

//express app
const app = express();

//middleware
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
