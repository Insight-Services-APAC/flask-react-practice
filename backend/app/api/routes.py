from flask_restful import Resource
from app.models.todo import Todo
from app.utils.request_parser import todo_parser
from app.models import db

class TodoListResource(Resource):
    """Resource for multiple todos - handles GET and POST requests."""
    
    def get(self):
        """Retrieve all todos."""
        # Implement this method to get all todos
        pass
        
    def post(self):
        """Create a new todo."""
        # Implement this method to create a new todo
        pass

class TodoResource(Resource):
    """Resource for a single todo - handles GET, PUT and DELETE requests."""
    
    def get(self, todo_id):
        """Retrieve a specific todo."""
        # Implement this method to get a todo by id
        pass
        
    def put(self, todo_id):
        """Update a specific todo."""
        # Implement this method to update a todo by id
        pass
        
    def delete(self, todo_id):
        """Delete a specific todo."""
        # Implement this method to delete a todo by id
        pass

def initialize_routes(api):
    """Register resources with the API."""
    # Implement this function to add resources to the API
    pass
