import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().trim().alphanum().min(3).max(20).required(),
  password: Joi.string().min(5).max(100),
});

export default userSchema;
