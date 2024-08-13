import express from "express";
import * as controller from "../controller/reservationsController.js";

const router = express.Router();

// GET - get all listings
router.get("/", controller.getReservations);

// GET - get a single listing
router.get("/:id", controller.getReservation);

// POST - create new listing
router.post("/", controller.createReservation);

// PATCH - update a listing
router.patch("/:id", controller.updateReservation);

// DELETE - delete a listing
router.delete("/:id", controller.deleteReservation);

export default router;
