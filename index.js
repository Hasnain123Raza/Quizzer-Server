import path from "path";
import express from "express";
import apiRouter from "./routers/api/index.js";
import database from "./services/database/index.js";
import session from "./services/session/index.js";
import "./services/passport/index.js";
import passport from "passport";

import dotenv from "dotenv";
dotenv.config();

// START SERVER //

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);

const __dirname = path.resolve(path.dirname(""));
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Quizzer App listening at port: ${server.address().port}`);
});

////
