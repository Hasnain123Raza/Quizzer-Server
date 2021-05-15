import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/", (request, response, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return response.sendStatus(404);
    if (!user) return response.json(info);
    request.logIn(user, (error) => {
      if (error) return response.sendStatus(404);
      response.json({ _id: user._id });
    });
  })(request, response, next);
});

export default router;
