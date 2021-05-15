import express from "express";
import quizModel from "../../../../services/database/models/quiz.js";

const router = express.Router();

router.get("/unrevealedQuiz/:quizId", async (request, response) => {
  const { quizId } = request.params;

  try {
    const quiz = await quizModel.findById(quizId);
    const take = {
      _id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.map((question) => ({
        _id: question._id,
        prompt: question.prompt,
        choices: question.choices.map((choice) => ({
          _id: choice._id,
          prompt: choice.prompt,
        })),
      })),
    };
    response.json(take);
  } catch (error) {
    console.log(error);
    response.sendStatus(404);
  }
});

router.get("/correctChoices/:quizId/:questionId", async (request, response) => {
  const params = request.params;
  const quizId = params.quizId;
  const questionId = parseInt(params.questionId);

  try {
    if (!isNumber(questionId)) throw new Error("questionId need to be numbers");
    const quiz = await quizModel.findById(quizId);
    const question = quiz.questions[questionId - 1];
    const correctChoices = question.choices
      .filter((choice) => choice.correct)
      .map((choice) => choice._id);
    response.json(correctChoices);
  } catch (error) {
    console.log(error);
    response.sendStatus(404);
  }
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default router;
