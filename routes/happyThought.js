/** This file contains all the routes */

import HappyThought from "../models/MongooseModel";
import express from "express";
import expressListEndpoints from "express-list-endpoints";

const app = express.Router();

/** 
 * Documentation for the API.
 */
app.get("/", (request, response) => {
  const endpoints = expressListEndpoints(app); // Get all endpoints
  response.json({
    message: "Welcome to the Happy Thoughts API 🌟",
    endpoints: endpoints,
  });
});

/** 
 * Endpoint to GET 20 thoughts. 
*/
app.get("/thoughts", async (request, response) => {
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
app.post("/thoughts", async (request, response) => {
  const { message } = request.body;

  try {
    const newThought = await HappyThought.create({ message });
    response.status(201).json(newThought);
  } catch (error) {
    response.status(400).json({ message: "Could not save thought to the Database", error: error.message });
  }
});

/**
 * Endpoint to POST a like.
 */

app.post("/thoughts/:thoughtId/like", async (request, response) => {
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

export default app;
