# Tasker: A Task Manager Web App Backend

Welcome to the backend repository for Tasker, a task manager web application. This project is built using TypeScript, Express, and MongoDB.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Tasker is a task management web application designed to help users organize and manage their tasks efficiently. This repository contains the backend codebase, which provides RESTful APIs for the frontend to interact with.

## Features
- User authentication and authorization
- Create, read, update, and delete tasks
- Task categorization and prioritization
- Due date and reminder notifications

## Technologies Used
- **TypeScript**: For type-safe JavaScript development
- **Express**: A minimal and flexible Node.js web application framework
- **MongoDB**: A NoSQL database for storing task data
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Sahiljain0/Task-Manager.git
    cd tasker-next-app/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
Once the server is running, you can access the API at `http://localhost:3000`. Use tools like Postman or cURL to interact with the endpoints.

## API Endpoints
Here are some of the main API endpoints:

- **User Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login a user

- **Tasks**
  - `GET /api/tasks` - Get all tasks
  - `POST /api/tasks` - Create a new task
  - `GET /api/tasks/:id` - Get a task by ID
  - `PUT /api/tasks/:id` - Update a task by ID
  - `DELETE /api/tasks/:id` - Delete a task by ID

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include tests for new features.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
