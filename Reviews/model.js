import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("ReviewsModel", schema);
export default model;
