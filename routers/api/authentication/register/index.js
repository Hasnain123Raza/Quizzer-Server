import express from "express";
import userModel from "../../../../services/database/models/user.js";
import userSchema from "../userSchema.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (request, response) => {
  let user = request.body;

  try {
    const result = userSchema.validate(user);
    if (result.error) throw new Error(result.error.details[0].message);

    const duplicate = await userModel
      .findOne({ username: user.username })
      .collation({ locale: "en", strength: 1 })
      .exec();
    if (duplicate)
      return response.json({
        error: "Username is not unique",
        field: "username",
      });

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const savedResponse = await new userModel(user).save();
    response.json({
      _id: savedResponse._id,
    });
  } catch (error) {
    console.log(error);
    response.sendStatus(404);
  }
});

export default router;
