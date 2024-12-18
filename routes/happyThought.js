/** This file contains all the routes */

import HappyThought from "../models/MongooseModel";
import express from "express";

const router = express.Router();

/** 
 * Endpoint to GET 20 thoughts. 
*/
router.get("/thoughts", async (request, response) => {
  try {
    const thoughts = await HappyThought.find()
      .sort({ createdAt: "desc" })
      .limit(20);
    response.status(200).json(thoughts);
  } catch (error) {
    response.status(400).json({ message: "Could not get thoughts", error: error.message });
  }
});

/**
 * Endpoint to POST a thought.
 */
router.post("/", async (request, response) => {
  const { message } = request.body;

  try {
    const newThought = await HappyThought.create({ message });
    response.status(201).json(savedThought);
  } catch (error) {
    response.status(400).json({ message: "Could not save thought to the Database", error: error.message });
  }
});

/**
 * Endpoint to POST a like.
 */

router.post("/thoughts/:thoughtId/like", async (request, response) => {

  const { thoughtId } = request.params;
});

export default router;
