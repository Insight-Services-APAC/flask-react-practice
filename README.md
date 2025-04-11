# Full-Stack Todo Application Exercise

This repository is set up as a learning exercise to build a full-stack Todo application using Flask for the backend API and React (with Vite) for the frontend.

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

## Development Tasks

### Backend Tasks

1. Set up the Flask application structure
2. Create the Todo data model
3. Implement API endpoints for CRUD operations
4. Write tests for the API endpoints
5. Configure for development and production

### Frontend Tasks

1. Set up the React application with Vite
2. Create components for the Todo UI
3. Implement the Context for state management
4. Connect to the backend API
5. Add styling to make it user-friendly
6. Write tests for components

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```bash
   python run.py
   ```

5. Run tests:
   ```bash
   pytest
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

## API Endpoints to Implement

- `GET /todos`: Retrieve all todo items
- `POST /todos`: Create a new todo item
- `GET /todos/<id>`: Retrieve a specific todo item
- `PUT /todos/<id>`: Update a specific todo item
- `DELETE /todos/<id>`: Delete a specific todo item

## Todo Model Structure

The Todo model should have these fields:
- id: Integer primary key
- title: String (required)
- description: String (optional)
- completed: Boolean (defaults to False)
- due_date: DateTime (optional)
- created_at: DateTime (defaults to current time)

## Implementation Outline

### Backend Implementation

1. **Model**: Define the Todo model in `app/models/todo.py`
   - Create the SQLAlchemy model with appropriate fields
   - Implement the `to_dict()` method for JSON serialization

2. **Request Parser**: Set up request parsing in `app/utils/request_parser.py`
   - Define required and optional fields
   - Add appropriate data type validation

3. **API Routes**: Implement the API endpoints in `app/api/routes.py`
   - Create TodoListResource (GET, POST)
   - Create TodoResource (GET, PUT, DELETE)
   - Register routes with the API

### Frontend Implementation

1. **API Client**: Implement API calls in `src/api/todoApi.js`
   - Implement fetchTodos, createTodo, updateTodo, deleteTodo functions

2. **Context**: Set up state management in `src/context/TodoContext.jsx`
   - Manage todos state, loading state, and error state
   - Provide methods for CRUD operations

3. **Components**: Implement UI components
   - TodoForm: For creating and editing todos
   - TodoItem: For displaying a single todo
   - TodoList: For displaying all todos
   - Common components: ErrorMessage, LoadingSpinner

4. **App Component**: Connect everything in App.jsx

## Tips and Guidelines

- Start by making the tests pass one by one
- Focus on functionality first, then improve the UI
- Use the Todo model structure as defined in the tests
- Make incremental changes and test frequently
- Use the browser developer tools to debug frontend issues
- Check the Flask logs for backend errors

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Flask-RESTful Documentation](https://flask-restful.readthedocs.io/)
- [Flask-SQLAlchemy Documentation](https://flask-sqlalchemy.palletsprojects.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Vite Documentation](https://vitejs.dev/guide/)