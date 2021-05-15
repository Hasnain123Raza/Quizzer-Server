import express from "express";

import quizRouter from "./quiz/index.js";
import authenticationRouter from "./authentication/index.js";
import authenticatedRouter from "./authenticated/index.js";

const router = express.Router();

router.use("/quiz", quizRouter);
router.use("/authentication", authenticationRouter);
router.use("/authenticated", authenticatedRouter);

export default router;
