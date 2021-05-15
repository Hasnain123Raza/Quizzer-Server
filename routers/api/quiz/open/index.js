import express from "express";
import quizModel from "../../../../services/database/models/quiz.js";

const router = express.Router();

router.get("/simplifiedQuiz/:quizId", async (request, response) => {
  const { quizId } = request.params;

  try {
    const quiz = await quizModel.findById(quizId);
    const simplified = {
      _id: quiz._id,
      title: quiz.title,
      description: quiz.description,
    };
    response.json(simplified);
  } catch (error) {
    console.log(error);
    response.sendStatus(404);
  }
});

export default router;
