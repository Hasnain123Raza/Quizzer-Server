import express from "express";
import quizModel from "../../../../services/database/models/quiz.js";

const router = express.Router();

router.get("/quizCount", async (request, response) => {
  try {
    // CONSIDER CHANGING TO ESTIMATED COUNT
    const count = await quizModel.countDocuments();
    response.json({ count });
  } catch (error) {
    console.log(error);
    response.sendStatus(404);
  }
});

router.get(
  "/simplifiedQuizzes/:pageIndex/:pageSize",
  async (request, response) => {
    const params = request.params;
    const pageIndex = parseInt(params.pageIndex);
    const pageSize = parseInt(params.pageSize);

    try {
      const quizzes = await quizModel
        .find({})
        .skip(pageIndex * pageSize)
        .limit(pageSize);
      const simplified = quizzes.map((quiz) => ({
        _id: quiz._id,
        title: quiz.title,
        description: quiz.description,
      }));
      response.json(simplified);
    } catch (error) {
      console.log(error);
      response.sendStatus(404);
    }
  }
);

export default router;
