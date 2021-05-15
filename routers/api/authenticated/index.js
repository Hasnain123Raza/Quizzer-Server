import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
  response.json({
    authenticated: request.user,
  });
});

export default router;
