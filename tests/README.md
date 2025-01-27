# User Management API

This is a simple CRUD (Create, Read, Update, Delete) API for managing users. Built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**, this API allows you to create, retrieve, update, and delete users with data validation and error handling.

## Prerequisites

Before running the project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/) (or MongoDB Atlas)

## Installation

Follow these steps to install and run the project locally:

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/user-management-api.git
cd user-management-api
2. Install Dependencies
Navigate into the project directory and install the required dependencies:


npm install
3. Set up MongoDB
If you’re using MongoDB locally, you can use the default connection string: mongodb://localhost:27017/userDB.
If you’re using MongoDB Atlas or another hosted database, make sure to update the MongoDB connection string in the server.js or configuration files accordingly.
4. Start the Server
To run the server, use the following command:


npm start
The server will be accessible at http://localhost:5001.

5. Run in Development Mode
To run the server in development mode with automatic reloading (using Nodemon):


npm run dev
6. Run Tests
To ensure that all functionalities are working, you can run tests with Jest. This will test your API routes.


npm test
API Routes
1. POST /api/users
Create a new user with the provided data. The request body should include:

name: The name of the user (String, required)
email: The email address of the user (String, required)
password: The user's password (String, required)
Response:

Status 201: User successfully created.
Status 400: Validation error if the data is invalid.
Status 409: If the user already exists.
2. GET /api/users
Retrieve all users.

Response:

Status 200: Returns a list of all users.
3. GET /api/users/:id
Retrieve a user by their ID.

Response:

Status 200: Returns the user data.
Status 404: User not found.
4. PUT /api/users/:id
Update a user by their ID. The request body should include at least one of the following fields:

name: The updated name of the user (String)
email: The updated email of the user (String)
password: The updated password of the user (String)
Response:

Status 200: User successfully updated.
Status 400: Validation error if the data is invalid.
Status 404: User not found.
5. DELETE /api/users/:id
Delete a user by their ID.

Response:

Status 200: User successfully deleted.
Status 404: User not found.
Project Structure
Here is an overview of the project structure:

/user-management-api
|-- /controllers       # Controllers for handling API logic
|-- /models            # Mongoose models for the User schema
|-- /routes            # API route definitions
|-- /tests             # Unit and integration tests
|-- /config            # Configuration files (database connection, etc.)
|-- server.js          # Main entry point for the application
|-- package.json       # Dependencies and scripts
server.js
The entry point of the application where the Express server is configured and the routes are registered. It also connects to MongoDB.

models/User.js
Defines the User schema using Mongoose.

controllers/userController.js
Contains functions that handle requests to the /api/users routes (create, get, update, delete users).

routes/userRoutes.js
Defines the routes for user-related operations.

tests/userRoutes.test.js
Includes Jest tests for the user routes to ensure that the API works as expected.

Tests
The project uses Jest for testing. Tests are located in the tests folder.

To run the tests:

bash
Copier
Modifier
npm test
Jest will simulate HTTP requests and test the CRUD operations of the API.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributions
Feel free to fork this project and submit pull requests if you'd like to contribute to this project.

For more information or questions, please feel free to open an issue or contribute to the repository.

### Breakdown of the Sections:

- **Prerequisites**: Lists what you need to install before starting the project.
- **Installation**: Step-by-step guide on how to set up the project locally, including cloning, installing dependencies, and running the server.
- **API Routes**: Describes all the available API routes, what they do, and what the expected inputs/outputs are.
- **Project Structure**: Provides an overview of the directory layout and explains where key files are located.
- **Tests**: Details how to run tests using Jest to ensure everything works as expected.
- **License**: Specifies that the project is licensed under the MIT License.
- **Contributions**: Encourages other developers to contribute to the project.
```
