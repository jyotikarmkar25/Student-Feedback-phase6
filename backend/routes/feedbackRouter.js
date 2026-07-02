const express = require("express");

const router = express.Router();

const {
  submitFeedback,
  getAllFeedback
} = require("../controllers/feedbackController");

router.post("/feedback", submitFeedback);
router.get("/feedback", getAllFeedback);

module.exports = router;