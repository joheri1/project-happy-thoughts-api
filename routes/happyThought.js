/** This file contains all the routes */

import HappyThought from "../models/MongooseModel";
import express from "express";

const router = express.Router();

/** 
 * Documentation endpoint
 */
app.get("/", (request, response) => {
  const endpoints = expressListEndpoints(app);
  response.json({
    message: "Welcome to the Elves API! Here are the available endpoints:",
    description: {
      "/elves": "Get all elves or filter using query params, e.g., ?title=backend dasher&top_twelves=true",
      "/elves/:id": "Get a specific elf by ID",
      "/test": "Test endpoint",
    },
    endpoints: endpoints
  });
});

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

  try {
    const updatedThought = await HappyThought.findByIdAndUpdate(thoughtId,
      { $inc: { hearts: 1 } }, // Add 1 heart/like to the thought
      { new: true } // Return the updated thought
    );
    
    if (!updatedThought) {
      return response.status(404).json({ message: "Thought not found" });
    }

    response.status(200).json(updatedThought);
    
  } catch (error) {
    response.status(400).json({ message: "Could not like thought", error: error.message });
  }
});

export default router;
