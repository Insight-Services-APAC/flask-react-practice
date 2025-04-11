from app.models import db
from datetime import datetime

class Todo(db.Model):
    """Todo model for storing tasks.
    
    Implementation needed:
    - Define id, title, description, completed, due_date, created_at fields
    - Implement to_dict() method for JSON serialization
    """
    # Add your code here to define the Todo model columns
    
    def to_dict(self):
        """Convert Todo object to dictionary for JSON serialization."""
        # Implement this method to convert the Todo object to a dictionary
        pass
