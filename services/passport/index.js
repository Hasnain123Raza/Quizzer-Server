import userModel from "../database/models/user.js";
import userSchema from "../../routers/api/authentication/userSchema.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const verifyCallback = async (username, password, done) => {
  try {
    const result = userSchema.validate({ username, password });
    if (result.error) throw new Error(result.error.details[0].message);

    const dbUser = await userModel
      .findOne({ username: username })
      .collation({ locale: "en", strength: 1 })
      .exec();
    if (!dbUser)
      return done(null, false, {
        field: "username",
        error: "Username is invalid.",
      });

    const passwordCorrect = await bcrypt.compare(password, dbUser.password);
    if (!passwordCorrect)
      return done(null, false, {
        field: "password",
        error: "Password is invalid.",
      });

    done(null, dbUser);
  } catch (error) {
    console.log(error);
    done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const dbUser = await userModel.findById(userId);
    if (dbUser)
      return done(null, { _id: dbUser._id, username: dbUser.username });
    else return done(null, false);
  } catch (error) {
    console.log(error);
    done(error);
  }
});
