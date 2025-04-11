import os
import sys
import pytest
import json
from datetime import datetime, timedelta

# Add the parent directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from app.models import db
from app.models.todo import Todo
from config.settings import TestingConfig

@pytest.fixture(scope='session')
def app():
    """Create and configure a Flask app for testing."""
    app = create_app(TestingConfig)
    return app

@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()

@pytest.fixture(autouse=True)
def app_context(app):
    """Create an application context for tests."""
    with app.app_context():
        db.create_all()
        yield
        db.session.close()
        db.drop_all()

@pytest.fixture
def sample_todo(app_context):
    """Create a sample Todo entry."""
    todo = Todo(
        title="Test Todo",
        description="This is a test todo item",
        completed=False,
        due_date=datetime.now() + timedelta(days=1)
    )
    db.session.add(todo)
    db.session.commit()
    return todo

def test_get_todos_empty(client):
    """Test getting todos when database is empty."""
    response = client.get('/todos')
    assert response.status_code == 200
    assert response.json == []
    
    # HINT: If this test fails, make sure your GET /todos endpoint returns a JSON array,
    # even when there are no todos in the database.

def test_get_todos(client, sample_todo):
    """Test getting list of todos."""
    response = client.get('/todos')
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]['title'] == "Test Todo"
    assert response.json[0]['description'] == "This is a test todo item"
    assert response.json[0]['completed'] == False
    
    # HINT: If this test fails, check that your Todo.to_dict() method correctly
    # serializes all fields and that your GET /todos endpoint returns all todos.

def test_create_todo(client):
    """Test creating a new todo."""
    today = datetime.now().strftime('%Y-%m-%d')
    data = {
        'title': 'New Todo',
        'description': 'This is a new todo item',
        'completed': False,
        'due_date': today
    }
    response = client.post('/todos', json=data)
    assert response.status_code == 201
    assert response.json['title'] == data['title']
    assert response.json['description'] == data['description']
    assert response.json['completed'] == data['completed']
    
    # HINT: If this test fails, check that your POST /todos endpoint correctly
    # creates a new todo from the request data and returns the created todo with status 201.

def test_create_todo_without_optional_fields(client):
    """Test creating a todo with only required fields."""
    data = {
        'title': 'Minimal Todo'
    }
    response = client.post('/todos', json=data)
    assert response.status_code == 201
    assert response.json['title'] == data['title']
    assert not response.json['completed']  # Should default to False
    
    # HINT: If this test fails, ensure your model provides default values
    # for optional fields and that your endpoint handles missing fields.

def test_create_todo_missing_required_fields(client):
    """Test creating a todo with missing required fields."""
    data = {
        'description': 'Missing title'
    }
    response = client.post('/todos', json=data)
    assert response.status_code == 400
    
    # HINT: If this test fails, make sure your request parser validates
    # that the 'title' field is required.

def test_get_todo(client, sample_todo):
    """Test getting a specific todo."""
    response = client.get(f'/todos/{sample_todo.id}')
    assert response.status_code == 200
    assert response.json['title'] == sample_todo.title
    assert response.json['description'] == sample_todo.description
    
    # HINT: If this test fails, check that your GET /todos/<id> endpoint
    # correctly retrieves and returns the requested todo.

def test_get_nonexistent_todo(client):
    """Test getting a todo that doesn't exist."""
    response = client.get('/todos/999')
    assert response.status_code == 404
    
    # HINT: If this test fails, ensure your endpoint returns a 404 status
    # when the requested todo ID doesn't exist.

def test_update_todo(client, sample_todo):
    """Test updating a todo."""
    data = {
        'title': 'Updated Todo',
        'description': 'This todo has been updated',
        'completed': True
    }
    response = client.put(f'/todos/{sample_todo.id}', json=data)
    assert response.status_code == 200
    assert response.json['title'] == data['title']
    assert response.json['description'] == data['description']
    assert response.json['completed'] == data['completed']
    
    # HINT: If this test fails, check that your PUT /todos/<id> endpoint
    # correctly updates the todo with the provided data.

def test_update_nonexistent_todo(client):
    """Test updating a todo that doesn't exist."""
    data = {
        'title': 'Updated Todo'
    }
    response = client.put('/todos/999', json=data)
    assert response.status_code == 404
    
    # HINT: If this test fails, make sure your endpoint returns a 404 status
    # when trying to update a todo that doesn't exist.

def test_delete_todo(client, sample_todo):
    """Test deleting a todo."""
    response = client.delete(f'/todos/{sample_todo.id}')
    assert response.status_code == 200
    
    # Verify todo was deleted
    response = client.get(f'/todos/{sample_todo.id}')
    assert response.status_code == 404
    
    # HINT: If this test fails, make sure your DELETE /todos/<id> endpoint
    # correctly removes the todo from the database.

def test_delete_nonexistent_todo(client):
    """Test deleting a todo that doesn't exist."""
    response = client.delete('/todos/999')
    assert response.status_code == 404
    
    # HINT: If this test fails, ensure your endpoint returns a 404 status
    # when trying to delete a todo that doesn't exist.
