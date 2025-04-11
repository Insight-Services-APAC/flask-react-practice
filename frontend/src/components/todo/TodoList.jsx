import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import TodoItem from './TodoItem';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

function TodoList() {
  // Implement this component to display the list of todos
  // It should handle loading, errors, and empty states
  
  return (
    <div>
      <h2>Todo List</h2>
      {/* Handle loading, errors, and todo list display */}
    </div>
  );
}

export default TodoList;
