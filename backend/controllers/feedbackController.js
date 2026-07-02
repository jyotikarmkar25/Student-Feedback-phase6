const Feedback = require("../models/feedbackModel");

const submitFeedback = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const feedback = new Feedback({
      name,
      rating,
      comment
    });

    await feedback.save();

    res.status(201).json({
      message: "Feedback Saved",
      feedback
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL FeedBack

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    res.status(200).json(feedbacks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback
};