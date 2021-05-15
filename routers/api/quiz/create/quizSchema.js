import Joi from "joi";

const choiceSchema = Joi.object({
  prompt: Joi.string().trim().min(1).max(200).required(),
  correct: Joi.boolean().required(),
});

const questionSchema = Joi.object({
  prompt: Joi.string().trim().min(10).max(200).required(),
  choices: Joi.array()
    .items(choiceSchema)
    .has({
      prompt: Joi.string().trim().min(1).max(200).required(),
      correct: Joi.boolean().valid(false).required(),
    })
    .has({
      prompt: Joi.string().trim().min(1).max(200).required(),
      correct: Joi.boolean().valid(true).required(),
    })
    .required(),
});

const quizSchema = Joi.object({
  title: Joi.string().trim().min(10).max(50).required(),
  description: Joi.string().trim().min(10).max(200).required(),
  questions: Joi.array().items(questionSchema).min(2).required(),
});

export default quizSchema;
