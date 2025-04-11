# Full-Stack Todo Application Exercise

This repository is set up as a learning exercise to build a full-stack Todo application using Flask for the backend API and React (with Vite) for the frontend.

## Development Environment

This project is designed to be used with GitHub Codespaces or a local development container. The `.devcontainer` directory contains all the configuration needed to set up a development environment with the necessary dependencies for both Python (Flask) and Node.js (React).

### Using GitHub Codespaces

1. Click the "Code" button on the GitHub repository page
2. Select the "Codespaces" tab
3. Click "Create codespace on main"
4. Wait for the codespace to initialize (this may take a few minutes)

### Using VS Code Dev Containers Locally

1. Install Docker and the VS Code Remote - Containers extension
2. Open this repository in VS Code
3. When prompted, click "Reopen in Container"
4. Wait for the container to build and initialize

## Overview

The goal is to create a simple Todo application where users can:
- Create new todo items
- List all todo items
- Update existing todo items
- Delete todo items

Each todo item should have:
- A title (required)
- A description (optional)
- A status (completed or not completed)
- A due date (optional)

## Project Structure

The project is divided into two main parts:

### Backend (`/backend`)
- Flask web server
- RESTful API endpoints
- SQLAlchemy ORM
- SQLite database
- Pytest for testing

### Frontend (`/frontend`)
- React with hooks
- Context API for state management
- API communication with fetch
- Vite for bundling
- Vitest for testing

## Getting Started

After your development container is running:

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the development server:
   ```bash
   python run.py
   ```

3. Run tests:
   ```bash
   pytest
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

## API Endpoints to Implement

- `GET /todos`: Retrieve all todo items
- `POST /todos`: Create a new todo item
- `GET /todos/<id>`: Retrieve a specific todo item
- `PUT /todos/<id>`: Update a specific todo item
- `DELETE /todos/<id>`: Delete a specific todo item

## Implementation Guidelines

Refer to the implementation guide in `docs/implementation-guide.md` for detailed steps on implementing the application.

## Next Steps After Tests Pass

1. Enhance the UI with more styling
2. Add sorting or filtering options for todos
3. Implement search functionality
4. Add due date notifications
5. Implement categories or tags for todos
