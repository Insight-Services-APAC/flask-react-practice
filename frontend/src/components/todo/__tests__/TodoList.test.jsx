import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import { TodoContext } from '../../../context/TodoContext';
import { vi, describe, it, expect } from 'vitest';

describe('TodoList', () => {
  it('renders loading state', () => {
    render(
      <TodoContext.Provider value={{ loading: true, todos: [], error: null }}>
        <TodoList />
      </TodoContext.Provider>
    );
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    /* HINT: If this test fails, check that:
     * 1. Your TodoList shows a loading indicator when loading is true
     * 2. You might use the LoadingSpinner component for this
     */
  });

  it('renders todo list', () => {
    const mockTodos = [
      {
        id: 1,
        title: 'First Todo',
        description: 'Description for first todo',
        completed: false
      },
      {
        id: 2,
        title: 'Second Todo',
        description: 'Description for second todo',
        completed: true
      }
    ];

    render(
      <TodoContext.Provider value={{ loading: false, todos: mockTodos, error: null }}>
        <TodoList />
      </TodoContext.Provider>
    );

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    
    /* HINT: If this test fails, check that:
     * 1. Your TodoList properly maps over the todos array
     * 2. You're passing each todo to a TodoItem component
     * 3. TodoItem correctly displays the todo title
     */
  });

  it('renders empty state message', () => {
    render(
      <TodoContext.Provider value={{ loading: false, todos: [], error: null }}>
        <TodoList />
      </TodoContext.Provider>
    );

    expect(screen.getByText(/no todos|empty|add a todo/i)).toBeInTheDocument();
    
    /* HINT: If this test fails, check that:
     * 1. Your TodoList shows a message when there are no todos
     * 2. The message indicates that the list is empty
     */
  });

  it('renders error message', () => {
    render(
      <TodoContext.Provider value={{ 
        loading: false, 
        todos: [], 
        error: 'Failed to fetch todos' 
      }}>
        <TodoList />
      </TodoContext.Provider>
    );

    expect(screen.getByText(/failed to fetch todos/i)).toBeInTheDocument();
    
    /* HINT: If this test fails, check that:
     * 1. Your TodoList displays an error message when there's an error
     * 2. You might use the ErrorMessage component for this
     */
  });
});
