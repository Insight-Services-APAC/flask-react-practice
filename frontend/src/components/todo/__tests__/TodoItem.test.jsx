import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../TodoItem';
import { TodoContext } from '../../../context/TodoContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';

const mockTodo = {
  id: 1,
  title: 'Test Todo',
  description: 'This is a test todo item',
  completed: false,
  due_date: '2023-12-31'
};

describe('TodoItem', () => {
  const mockContextValue = {
    deleteTodo: vi.fn(),
    setSelectedTodo: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders todo details', () => {
    render(
      <TodoContext.Provider value={mockContextValue}>
        <TodoItem todo={mockTodo} />
      </TodoContext.Provider>
    );
    
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    
    /* HINT: If this test fails, check that:
     * 1. Your TodoItem component displays the todo title
     * 2. You're properly receiving the todo prop
     */
  });

  it('calls setSelectedTodo when edit button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <TodoContext.Provider value={mockContextValue}>
        <TodoItem todo={mockTodo} />
      </TodoContext.Provider>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);
    
    expect(mockContextValue.setSelectedTodo).toHaveBeenCalledWith(mockTodo);
    
    /* HINT: If this test fails, check that:
     * 1. Your TodoItem has an edit button
     * 2. The edit button calls setSelectedTodo with the todo object
     */
  });

  it('calls deleteTodo when delete is confirmed', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockImplementation(() => true);

    render(
      <TodoContext.Provider value={mockContextValue}>
        <TodoItem todo={mockTodo} />
      </TodoContext.Provider>
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);
    
    expect(mockContextValue.deleteTodo).toHaveBeenCalledWith(mockTodo.id);
    
    /* HINT: If this test fails, check that:
     * 1. Your TodoItem has a delete button
     * 2. The delete button calls deleteTodo with the todo id
     * 3. You're handling the confirmation dialog correctly
     */
  });

  it('displays completion status', () => {
    const completedTodo = { ...mockTodo, completed: true };
    
    render(
      <TodoContext.Provider value={mockContextValue}>
        <TodoItem todo={completedTodo} />
      </TodoContext.Provider>
    );
    
    // Look for some indication that the todo is completed
    // This could be text, a checkbox, or a CSS class
    const completionIndicator = screen.getByText(/completed|done/i) || 
                               screen.getByRole('checkbox', { checked: true }) ||
                               document.querySelector('.completed');
    
    expect(completionIndicator).toBeInTheDocument();
    
    /* HINT: If this test fails, check that:
     * 1. Your TodoItem shows the completed status visually
     * 2. You might do this with text, a checkbox, or styling
     */
  });
});
