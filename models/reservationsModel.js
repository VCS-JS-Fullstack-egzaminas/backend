import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    listing: { type: Schema.Types.ObjectId, ref: "Listings", required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Reservations", reservationSchema);
