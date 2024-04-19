import model from "./model.js";
export const createReview = (review) => {
  delete review._id;
  return model.create(review);
};
export const findAllReviews = () => model.find();
export const findReviewBySongId = (songId) => model.findBySongId(songId);
export const findReviewByReviewer = (username) =>
  model.findOne({ reviewer: username });
export const updateReview = (reviewId, review) =>
  model.updateOne({ _id: reviewId }, { $set: review });
export const deleteReview = (reviewId) => model.deleteOne({ _id: reviewId });
