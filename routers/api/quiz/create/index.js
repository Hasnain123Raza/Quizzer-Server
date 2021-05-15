import express from "express";
import quizModel from "../../../../services/database/models/quiz.js";
import quizSchema from "./quizSchema.js";

const router = express.Router();

router.post("/postQuiz", async (request, response) => {
  let quiz = request.body;

  try {
    const result = quizSchema.validate(quiz);
    if (result.error) throw new Error(result.error.details[0].message);
    prepareQuiz(quiz);
    const savedResponse = await new quizModel(quiz).save();
    response.json(savedResponse);
  } catch (error) {
    console.log(error);
    response.sendStatus(404);
  }
});

function prepareQuiz(quiz) {
  quiz.questions.forEach((question, questionIndex) => {
    question._id = questionIndex + 1;
    question.choices.forEach((choice, choiceIndex) => {
      choice._id = choiceIndex + 1;
    });
  });
}

export default router;
