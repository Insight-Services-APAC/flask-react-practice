# Todo App Project Structure

This document outlines the organization of the Todo application repository.

```
todo-app/
├── README.md                 # Main project instructions
├── .devcontainer/            # Development container configuration
│   ├── devcontainer.json     # VS Code devcontainer settings
│   ├── docker-compose.yml    # Docker Compose configuration
│   ├── Dockerfile            # Container definition
│   └── post-create.sh        # Post-creation setup script
├── backend/                  # Flask backend
│   ├── requirements.txt      # Python dependencies
│   ├── run.py                # Application entry point
│   ├── app/                  # Main application package
│   │   ├── __init__.py       # Application factory
│   │   ├── api/              # API endpoints
│   │   │   ├── __init__.py   
│   │   │   └── routes.py     # API routes definition
│   │   ├── models/           # Database models
│   │   │   ├── __init__.py   # DB initialization
│   │   │   └── todo.py       # Todo model definition
│   │   └── utils/            # Utility functions
│   │       ├── __init__.py   
│   │       └── request_parser.py # Request validation
│   ├── config/               # Configuration settings
│   │   ├── __init__.py   
│   │   └── settings.py       # App configuration
│   └── tests/                # Backend tests
│       ├── __init__.py   
│       └── test_api.py       # API tests
└── frontend/                 # React frontend
    ├── index.html            # Entry HTML file
    ├── package.json          # NPM dependencies
    ├── vite.config.js        # Vite configuration
    └── src/                  # Source code
        ├── App.jsx           # Main App component
        ├── main.jsx          # Entry JavaScript file
        ├── setupTests.js     # Test configuration
        ├── api/              # API client
        │   └── todoApi.js    # API functions
        ├── components/       # React components
        │   ├── common/       # Shared components
        │   │   ├── ErrorMessage.jsx
        │   │   └── LoadingSpinner.jsx
        │   └── todo/         # Todo-specific components
        │       ├── TodoForm.jsx
        │       ├── TodoItem.jsx
        │       ├── TodoList.jsx
        │       └── __tests__/  # Component tests
        │           ├── TodoForm.test.jsx
        │           ├── TodoItem.test.jsx
        │           └── TodoList.test.jsx
        ├── context/          # React context
        │   └── TodoContext.jsx # State management
        └── styles/           # CSS styles
            └── index.css     # Global styles
```

## Key Files and Their Purposes

### Backend

- **run.py**: Server entry point that initializes and runs the Flask application
- **app/__init__.py**: Application factory with configuration
- **app/api/routes.py**: API endpoint definitions and request handling
- **app/models/todo.py**: Todo data model and database schema
- **app/utils/request_parser.py**: Request validation and parsing utilities
- **config/settings.py**: Configuration for development and testing
- **tests/test_api.py**: API tests

### Frontend

- **index.html**: Entry HTML document
- **src/main.jsx**: React application entry point
- **src/App.jsx**: Main application component
- **src/api/todoApi.js**: API client functions for backend communication
- **src/components/todo/**: Todo-related components
  - **TodoForm.jsx**: Form for creating/editing todo entries
  - **TodoList.jsx**: Displays list of todo entries
  - **TodoItem.jsx**: Individual todo entry component
- **src/context/TodoContext.jsx**: Global state management
- **src/styles/index.css**: Global styles

## Implementation Flow

When implementing this project, it's recommended to follow this order:

1. **Backend**
   - Implement the Todo model
   - Set up the request parser
   - Implement API routes
   - Test backend functionality

2. **Frontend**
   - Implement API client functions
   - Set up the Context for state management
   - Implement UI components
   - Connect everything in App.jsx
   - Test frontend functionality
