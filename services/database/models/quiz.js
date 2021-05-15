import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 200,
  },
  correct: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 200,
  },
  choices: {
    type: [choiceSchema],
    required: true,
    validate: [
      {
        validator: choiceArrayLimit,
        msg: "Question needs at least two choices.",
      },
      {
        validator: choiceArrayCorrect,
        msg: "Question needs at least one correct choice.",
      },
      {
        validator: choiceArrayIncorrect,
        msg: "Question needs at least one incorrect choice.",
      },
    ],
  },
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 200,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  questions: {
    type: [questionSchema],
    required: true,
    validate: [questionArrayLimit, "Quiz needs at least one question."],
  },
});

function choiceArrayLimit(val) {
  return val.length >= 2;
}

function choiceArrayCorrect(val) {
  return val.some((choice) => choice.correct);
}

function choiceArrayIncorrect(val) {
  return val.some((choice) => !choice.correct);
}

function questionArrayLimit(val) {
  return val.length >= 1;
}

export default mongoose.model("Quiz", quizSchema, "quiz");
