import express from "express";

const router = express.Router();

router.post("/", (request, response) => {
  request.logout();
  response.sendStatus(200);
});

export default router;
