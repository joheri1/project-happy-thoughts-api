import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. Example command to overwrite PORT env variable value: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

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
