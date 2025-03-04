# 📌 Node.js Intern Assignment - API Development & Documentation

## Overview

This project is part of my Node.js intern assignment, where I have developed and documented REST APIs for Event Management and Nudge Creation. The repository is structured to include:

- **[Task 1: API Development for Event Management](docs/API_Documentation.md)**
- **[Task 2: API Documentation for Nudge Creation](docs/Nudge_API_Documentation.md)**

## Installation

To install and run this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nodejs-intern-api.git
   cd nodejs-intern-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env` file based on the `.env.example` file.

4. Start the server:
   ```bash
   npm start
   ```

## Tech Stack Used

- **Backend**: Node.js, Express.js, MongoDB (Native Driver)
- **Middleware**: Multer (for file uploads)
- **Testing Tool**: Postman

## Implemented Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| GET    | /api/v3/app/events           | Fetch all events                     |
| GET    | /api/v3/app/events/:id       | Fetch a single event by ID          |
| POST   | /api/v3/app/events           | Create a new event (with file upload) |
| PUT    | /api/v3/app/events/:id       | Update an event (optional file upload) |
| DELETE | /api/v3/app/events/:id       | Delete an event by ID               |

✅ Completed API Development & Testing in Postman.

## Documentation Links

- 📌 [Read the full API documentation for Task 1 here](docs/API_Documentation.md)
- 📌 [Read the full API documentation for Task 2 here](docs/Nudge_API_Documentation.md)

## Task 2: API Documentation - Nudge Creation

### Objective

Write API documentation for the "Nudge Creation" feature.

### Nudge Features

- Users can tag an event.
- Set a title and description.
- Upload an image.
- Schedule a time.
- Include an icon with an invitation.
