import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import happyThoughtSchema from "./models/mongooseModel";
import happyThought from "./routes/happyThought";

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
const happyThought = mongoose.model("HappyThought", happyThoughtSchema);

/**
 * Endpoint to GET thoughts.
 * /

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
