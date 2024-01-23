# users-rest-api
This repository contains the source code for a simple Node.js RESTful API built with Express.js and Prisma. The API performs CRUD operations on a user entity and includes basic authentication, middleware for logging requests, and error handling.
# Node.js RESTful API with Prisma and Express.js

This repository contains the source code for a simple Node.js RESTful API built with Express.js and Prisma. The API performs CRUD operations on a user entity and includes basic authentication, middleware for logging requests, and error handling.

## Features

- CRUD operations for managing users
- Prisma ORM for efficient database interactions
- Express.js for handling HTTP requests and routing
- Middleware for logging incoming requests
- Basic authentication for one API endpoint
- Error handling middleware
- Pagination support for retrieving users

## Project Structure
- `src`: Contains source code
  - `controllers`: Route handlers for CRUD operations
  - `middleware`: Custom middleware functions
  - `routes`: Express.js route definitions
  - `util`: Utility functions
- `prisma`: Prisma-related files including the schema and migrations
- `index.js`: Main entry point for the Node.js application
- `package.json`: Project dependencies and scripts
- `docker-compose.yml`: Docker Compose configuration for PostgreSQL
- `.env`: Environment variables (include database connection details)

## Getting Started
1. Clone the repository: `git clone [repo-url]`
2. Install dependencies: `npm install`
3. Set up the database using Docker Compose: `docker-compose up -d`
4. Run the API: `npm start`

## API Documentation
Refer to the provided Postman collection for API endpoints and examples.

## Testing
Basic tests are included for each API endpoint. Run tests with: `npm test`

Feel free to customize this description based on the specific details of your project. Include any additional information that might be helpful for collaborators or users of your repository.
