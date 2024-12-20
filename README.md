# Project Happy Thoughts API

This is the backend API for the Happy Thoughts project, used to store and manage "happy thoughts" submitted by users. It is built with Node.js, Express, and MongoDB, hosted on Render.

### Features
- **GET /thoughts**: Fetches the 20 most recent happy thoughts, sorted by creation date.
- **POST /thoughts**: Allows users to submit a new happy thought.
- **POST /thoughts/:thoughtId/like**: Adds a like (heart) to a specific thought by ID.

### Deployed Backend
- **Base URL**: [https://project-happy-thoughts-api-gns9.onrender.com](https://project-happy-thoughts-api-gns9.onrender.com)

### Frontend Integration
This backend is connected to the [Happy Thoughts Frontend](https://github.com/joheri1/project-happy-thoughts-vite), a React application for displaying and interacting with the happy thoughts.

- **Backend Repository**: [Happy Thoughts API](https://github.com/joheri1/project-happy-thoughts-api)
- **Backend URL**: [https://project-happy-thoughts-api-gns9.onrender.com](https://project-happy-thoughts-api-gns9.onrender.com)

## The problem
### Connecting the Frontend, Backend, and Database  
When I started integrating my React frontend, Node.js backend, and MongoDB Atlas database, I faced several issues. Here's a few of them: 
- My MongoDB Atlas user seemed to have the correct password, but for some non-obvious reason, the connection still failed. I resolved this by generating a new password for the user and updating the `MONGO_URL` in Render’s environment variables.
- During development, I got an error saying that `savedThought` was not defined in the `POST /thoughts` endpoint. This was caused by a typo, and I fixed it by correctly referencing the newly created thought object as `newThought`. 
- The error 'Operation 'happythoughts.find()' buffering timed out' because the database wasn’t properly configured in MongoDB Atlas. This was resolved by adding 0.0.0.0/0 in Network Access in MongoDB Atlas to allow connections from any IP address (necessary for Render).  

I used Postman a lot to test my API endpoints and MongoDB Compass to confirm that data was being stored in the database. I uploaded a json with a few "happy thoughts" to make the testing easier, while debugging issues with my initial POST request.  

I also sketched a simple flow on paper to map out how each part of the application interacts, such as how MONGO_URL is used in the backend to connect to MongoDB Atlas, and that BASE_URL links the frontend to the backend. This really helped when debugging. 

## View it live

- **Frontend URL**: [Project Happy Thoughts](https://project-happy-thoughts-x.netlify.app/)
- **Backend URL**: [https://project-happy-thoughts-api-gns9.onrender.com](https://project-happy-thoughts-api-gns9.onrender.com)
