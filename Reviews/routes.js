import * as dao from "./dao.js";

export default function ReviewRoutes(app) {
  const createReview = async (req, res) => {
    try {
      const review = await dao.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findAllReviews = async (req, res) => {
    try {
      const reviews = await dao.findAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findReviewBySongId = async (req, res) => {
    try {
      const review = await dao.findReviewBySongId(req.params.songId);
      review
        ? res.json(review)
        : res.status(404).json({ message: "Review not found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const findReviewByReviewer = async (req, res) => {
    try {
      const review = await dao.findReviewByReviewer(req.params.username);
      review
        ? res.json(review)
        : res.status(404).json({ message: "Review not found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const updateResult = await dao.updateReview(reviewId, req.body);
      updateResult.modifiedCount > 0
        ? res.json({ message: "Review updated successfully" })
        : res
            .status(404)
            .json({ message: "No changes made or review not found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
      const deleteResult = await dao.deleteReview(reviewId);
      deleteResult.deletedCount > 0
        ? res.status(204).send()
        : res.status(404).json({ message: "Review not found" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Register routes
  app.post("/api/reviews", createReview);
  app.get("/api/reviews", findAllReviews);
  app.get("/api/reviews/songs/:songId", findReviewBySongId);
  app.get("/api/reviews/reviewer/:username", findReviewByReviewer);
  app.put("/api/reviews/:reviewId", updateReview);
  app.delete("/api/reviews/:reviewId", deleteReview);
}
