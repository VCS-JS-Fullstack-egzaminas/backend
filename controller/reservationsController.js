import Reservations from "../models/reservationsModel.js";
import Listings from "../models/listingsModel.js";
import mongoose from "mongoose";

//GET - get all reservations

export const getReservations = async (req, res) => {
  const reservations = await Reservations.find({}).sort({
    createdAt: -1,
  });
  res.status(200).json(reservations);
};

//GET - get a single reservation
export const getReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const reservation = await Reservations.findById(id);
  if (!reservation) {
    return res.status(404).json({ error: "No such reservation" });
  }

  res.status(200).json(reservation);
};

//POST - create new reservation

export const createReservation = async (req, res) => {
  const { listing, start, end } = req.body;
  let emptyFields = [];

  if (!listing) {
    emptyFields.push("listing");
  }
  if (!start) {
    emptyFields.push("start");
  }
  if (!end) {
    emptyFields.push("end");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    // Validate listing ID
    if (!mongoose.Types.ObjectId.isValid(listing)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    // Check if the listing exists
    const listingData = await Listings.findById(listing);
    if (!listingData) {
      return res.status(404).json({ error: "Listing does not exist" });
    }

    // Ensure listing is available
    if (!listingData.available) {
      return res
        .status(400)
        .json({ error: "Listing is not available for reservation" });
    }

    // Validate dates
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    if (endDate <= startDate) {
      return res
        .status(400)
        .json({ error: "'End' date must be after 'start' date" });
    }

    // Calculate the duration in days
    const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);

    // Check if duration is within allowed range
    if (
      duration < listingData.min_duration ||
      duration > listingData.max_duration
    ) {
      return res.status(400).json({
        error: `Reservation duration must be between ${listingData.min_duration} and ${listingData.max_duration} days`,
      });
    }

    // Check for overlapping reservations
    const overlappingReservation = await Reservations.findOne({
      listing,
      $or: [
        { start: { $lt: endDate }, end: { $gt: startDate } },
        { start: { $eq: startDate } },
        { end: { $eq: endDate } },
      ],
    });

    if (overlappingReservation) {
      return res.status(400).json({
        error: "The listing is already reserved for the selected dates",
      });
    }

    // Create the reservation
    const reservation = await Reservations.create({
      listing,
      start: startDate,
      end: endDate,
    });

    // Mark listing as unavailable if the reservation is created
    listingData.available = false;
    await listingData.save();

    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//PATCH - update a reservation

export const updateReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const reservation = await Reservations.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (!reservation) {
    return res.status(404).json({ error: "No such reservation" });
  }

  res.status(200).json(reservation);
};

//DELETE - delete a reservation

export const deleteReservation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const reservation = await Reservations.findOneAndDelete({ _id: id });

  if (!reservation) {
    return res.status(404).json({ error: "No such reservation" });
  }

  res.status(200).json(reservation);
};
