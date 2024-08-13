import express from "express";
import * as controller from "../controller/listingsController.js";

const router = express.Router();

// GET - get all listings
router.get("/", controller.getListings);

// GET - get a single listing
router.get("/:id", controller.getListing);

// POST - create new listing
router.post("/", controller.createListing);

// PATCH - update a listing
router.patch("/:id", controller.updateListing);

// DELETE - delete a listing
router.delete("/:id", controller.deleteListing);

export default router;
