import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import happyThoughtSchema from "./models/MongooseModel.js";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Defines the port the app will run on. 
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Use happyThoughtSchema to define a Mongoose model
const HappyThought = mongoose.model("HappyThought", happyThoughtSchema);

/**
 * Endpoint to GET thoughts.
 * Retrieves the 20 most recent thoughts, sorted by creation date in descending order. The endpoint responds with the thoughts in JSON format.
 */
app.get("/thoughts", (request, response) =>{
  Thought.find()
    .sort({ createdAt: "desc" })
    .limit(20)
    .then((thoughts) => {
      response.json(thoughts);
  });
});
/**
 * Endpoint to POST a thought.
 * The endpoint expects a JSON body with the thought message. The thought is saved to the database and the endpoint responds with the saved thought in JSON format.
 */
app.post("/thoughts", async (request, response) => {
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

app.post("/thoughts/:thoughtId/like", async (request, response) => {

  const { thoughtId } = request.params;
})

/**
 * Endpoint for testing the server.
 * This endpoint confirms that the server is running and responds with "The server is up, so come share your happy thoughts with us! 🌟"
 */
app.get("/test", (request, response) => {
  response.send("The server is up, so come share your happy thoughts with us! 🌟");
  console.log("The server is up, so come share your happy thoughts with us! 🌟");
});

/**
 * Start the server.
 * The server listens on the specified port and logs the URL to the console.
 */
app.listen(port, () => {
  console.log(`Server is spreading joy on http://localhost:${port} 🎉`);
});
