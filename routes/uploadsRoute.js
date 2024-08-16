import express from "express";
import { upload } from "../middleware/uploadsMiddleware.js";
import { uploadImages } from "../controller/uploadsController.js";

const router = express.Router();

router.post("/images", upload.array("images"), uploadImages);

export default router;
