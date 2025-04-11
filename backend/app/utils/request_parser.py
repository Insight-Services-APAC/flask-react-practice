from flask_restful import reqparse

# Create a request parser for validating and parsing todo data
todo_parser = reqparse.RequestParser(bundle_errors=True)
# Add arguments to the parser - title (required), description, completed, due_date
