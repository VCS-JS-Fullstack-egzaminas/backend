import mongoose from "mongoose";

const Schema = mongoose.Schema;

const equipmentSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
    price: { type: Number, required: true },
    isRented: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);