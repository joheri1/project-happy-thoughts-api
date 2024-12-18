/** This file contains all the routes */

import happyThoughtSchema from "../models/MongooseModel";
import express from "express";

const router = express.Router();

/** Endpoint to GET thoughts.
 * Retrieves the 20 most recent thoughts, sorted by creation date in descending order. The endpoint responds with the thoughts in JSON format.
 */
router.get("/thoughts", async (request, response) => {
  try {
    const thoughts = await Thought.find()
      .sort({ createdAt: "desc" })
      .limit(20);
    response.status(200).json(thoughts);
  } catch (error) {
    response.status(400).json({ message: "Could not get thoughts", error: error.message });
  }
});

/**
 * Endpoint to POST a thought.
 * The endpoint expects a JSON body with the thought message. The thought is saved to the database and the endpoint responds with the saved thought in JSON format.
 */
router.post("/thoughts", async (request, response) => {
  const { message } = request.body;
  const thought = new Thought({ message });

  try {
    const savedThought = await thought.save();
    response.status(201).json(savedThought);
  } catch (error) {
    response.status(400).json({ message: "Could not save thought to the Database", error: error.message });
  }
});

/**
 * Endpoint to POST a like to a thought.
 * The endpoint expects a JSON body with the thoughtId. The thought is updated with a like and the endpoint responds with the updated thought in JSON format.
 */

router.post("/thoughts/:thoughtId/like", async (request, response) => {

  const { thoughtId } = request.params;
});

export default router;