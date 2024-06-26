import mongoose from "mongoose";
const reviewsSchema = new mongoose.Schema(
  {
    review_id: { type: String, required: true },
    song_id: { type: String, required: true },
    star_rating: { type: Number, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    reviewer: { type: String, required: true },
    text: { type: String, required: true },
  },
  { collection: "reviews" }
);
export default reviewsSchema;
