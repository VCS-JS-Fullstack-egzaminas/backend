import express from "express";
import { upload } from "../middleware/uploadsMiddleware.js";
import { uploadImages } from "../controller/uploadsController.js";
import requireAuth from "../middleware/authenticationMiddleware.js";
import requireAdminAuthorization from "../middleware/authorizationMiddleware.js";

const router = express.Router();

router.post(
  "/images",
  upload.array("images"),
  requireAuth,
  requireAdminAuthorization,
  uploadImages
);

export default router;
