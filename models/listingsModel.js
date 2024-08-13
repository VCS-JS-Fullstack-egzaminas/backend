import mongoose from "mongoose";

const Schema = mongoose.Schema;

const equipmentSchema = new Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    photos: { type: Array, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, required: true },
    min_duration: { type: Number, required: true },
    max_duration: { type: Number, required: true },
    extras: { type: Array, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Listings", equipmentSchema);