# Task management API

This repository houses the codebase for our task management API. This system is designed to manage a wide array of tasks and sub tasks for specific user. In addition to this, it also include a feature of secure authentication mechanism using JWT.

## Features

- Authentication: Enables user registration with JWT.
- Task: Allows authorized users to create,delete,update tasks.
- Sub Tasks: Allows authorized users to create,delete,update sub tasks..

## Technologies Used

- Express.js: Our backend is constructed with Express.js, a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- MongoDB: We use MongoDB as our primary database to store all transactional and user data. MongoDB is a source-available cross-platform document-oriented database program, known for its high scalability and flexibility.

## Code Structure

The code is structured as follows:

1. Backend:

- index.js: This file is the entry point for the application's backend.
- routes: This directory contains the routes for authentication and tasks, each with different endpoints.
- models: This directory contains the Mongoose models for the user, tasks, and sub tasks.
- env: This file contains the environment variables, which include secret constants.
   

## Getting Started

Here's how you can use this repository:

Install and run locally my-project with npm

```bash
  Installation for Backend
  > npm i 
  > create a .env file and add MONGO_URI variable (For example: MONGO_URL="mongodb+srv://username:password@cluster0.6u2l6tl.mongodb.net/database_name")
   - JWT_SECRET variable (For example: JWT_SECRET="...SecretKey")
  > npm run dev
```
