# Todo App Implementation Guide

This guide provides detailed steps for implementing the Todo app without giving away complete solutions. Use this as a roadmap while working through the exercise.

## Backend Implementation

### 1. Todo Model (`app/models/todo.py`)

The Todo model needs to define the following fields:
- `id`: Integer primary key
- `title`: String, required (non-nullable)
- `description`: String, nullable
- `completed`: Boolean, default to False
- `due_date`: DateTime, nullable
- `created_at`: DateTime, default to current time

Also implement the `to_dict()` method to convert the Todo object to a JSON-serializable dictionary.

**Implementation tips:**
- Use `db.Column()` for defining fields
- Use appropriate SQLAlchemy types (Integer, String, Boolean, DateTime)
- Set default values with `default=`
- For date fields, import `datetime` module

### 2. Request Parser (`app/utils/request_parser.py`)

Set up the request parser to validate incoming data when creating or updating todos.

**Implementation tips:**
- Add `title` as a required field
- Add `description`, `completed`, and `due_date` as optional fields
- Set appropriate types and help messages
- Use `location='json'` to specify where to look for arguments

### 3. API Routes (`app/api/routes.py`)

Implement the REST API endpoints for CRUD operations:

#### TodoListResource:
- `GET /todos`: Return all todos as a JSON array
- `POST /todos`: Create a new todo from request data

#### TodoResource:
- `GET /todos/<id>`: Return a specific todo by ID
- `PUT /todos/<id>`: Update a specific todo by ID
- `DELETE /todos/<id>`: Delete a specific todo by ID

**Implementation tips:**
- Use `todo_parser.parse_args()` to get validated request data
- For GET endpoints, query the database and convert results to dictionaries
- For POST, create a new Todo instance, add to the session, and commit
- For PUT, find the todo by ID, update its fields, and commit
- For DELETE, find the todo by ID, delete it, and commit
- Return appropriate HTTP status codes (200, 201, 404, etc.)
- Use `db.session.get(Todo, id)` to find a todo by ID
- Return a 404 response when a todo isn't found

Don't forget to register routes with the API in the `initialize_routes()` function.

## Frontend Implementation

### 1. API Client (`src/api/todoApi.js`)

Implement the functions to communicate with the backend API:

- `fetchTodos()`: GET request to `/todos`
- `createTodo(todo)`: POST request to `/todos`
- `updateTodo(id, todo)`: PUT request to `/todos/{id}`
- `deleteTodo(id)`: DELETE request to `/todos/{id}`

**Implementation tips:**
- Use `fetch()` API for HTTP requests
- Set appropriate headers for JSON content
- Handle response status and convert to JSON
- Implement error handling with try/catch

### 2. Context (`src/context/TodoContext.jsx`)

Implement the context provider to manage state and provide CRUD operations:

- Set up state for `todos`, `loading`, `error`, and `selectedTodo`
- Implement methods for fetching, adding, updating, and deleting todos
- Load todos when the component mounts
- Provide the state and methods through the context value

**Implementation tips:**
- Use `useState` for state management
- Use `useEffect` to load todos on mount
- Implement error handling for all API calls
- Update the local state after successful API operations
- Set loading states before and after API calls

### 3. Components

#### TodoForm (`src/components/todo/TodoForm.jsx`)
- Create form elements for title, description, and completion status
- Add a date picker for due date
- Handle form submission
- Support both adding new todos and editing existing ones
- Validate required fields

**Implementation tips:**
- Use form state to track input values
- Populate form when `selectedTodo` changes (edit mode)
- Change button text based on add/edit mode
- Prevent the default form submission behavior
- Reset form after successful submission

#### TodoItem (`src/components/todo/TodoItem.jsx`)
- Display todo information: title, description, status, due date
- Add edit and delete buttons
- Apply styling based on completion status
- Handle edit and delete actions

**Implementation tips:**
- Use the context to access state and methods
- Format dates for display
- Add a confirmation dialog for delete actions
- Visually distinguish completed todos

#### TodoList (`src/components/todo/TodoList.jsx`)
- Handle loading state with LoadingSpinner
- Show errors with ErrorMessage
- Display todos using TodoItem components
- Handle empty state with a message

**Implementation tips:**
- Use conditional rendering for different states
- Map over todos array to create TodoItem components
- Show a message when there are no todos
- Add key prop for list items

#### Common Components
- Implement `ErrorMessage` to display error messages
- Implement `LoadingSpinner` to indicate loading

### 4. App Component (`src/App.jsx`)
- Render the main app title
- Include TodoForm and TodoList components
- Apply basic styling

## Testing the Implementation

Run the provided tests to verify your implementation:

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

Test failures will provide hints on what needs to be fixed. Work through each test one by one until all tests pass.

## Next Steps After Tests Pass

1. Enhance the UI with more styling
2. Add sorting or filtering options for todos
3. Implement search functionality
4. Add due date notifications
5. Implement categories or tags for todos
