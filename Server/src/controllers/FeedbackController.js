const FeedbackModel = require("../models/FeedbackModel");
class FeedbackController {
  async index(req, res) {
    res.send("Feedbacks");
  }
  async create(req, res) {
    try {
      console.log(req.body);
      await FeedbackModel.create(req.body);
      return res.status(200).json({ message: "Feedback created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error in creating feedback");
    }
  }
}
module.exports = new FeedbackController();
