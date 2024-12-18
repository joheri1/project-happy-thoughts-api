import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes/happyThought";

// Connects to the Mongo database
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// Defines the port the app will run on. 
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//Use routes fot HappyThoughts
app.use("/thoughts", routes);

/**
 * Endpoint for testing the server.
 */
app.get("/test", (request, response) => {
  response.send("The server is up, so come share your happy thoughts with us! 🌟");
  console.log("The server is up, so come share your happy thoughts with us! 🌟");
});

/**
 * Start the server.
 */
app.listen(port, () => {
  console.log(`Server is spreading joy on http://localhost:${port} 🎉`);
});
