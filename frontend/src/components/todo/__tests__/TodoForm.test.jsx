import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../TodoForm';
import { TodoContext } from '../../../context/TodoContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('TodoForm', () => {
  const mockContextValue = {
    addTodo: vi.fn(),
    updateTodo: vi.fn(),
    selectedTodo: null,
    setSelectedTodo: vi.fn(),
    error: null
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty form initially', () => {
    render(
      <TodoContext.Provider value={mockContextValue}>
        <TodoForm />
      </TodoContext.Provider>
    );
    
    expect(screen.getByLabelText(/title/i)).toHaveValue('');
    
    /* HINT: If this test fails, make sure your form has:
     * 1. A label element with text containing "title"
     * 2. An input field associated with that label
     * 3. The input field starts with an empty value
     */
  });

  it('updates form fields when typing', async () => {
    const user = userEvent.setup();
    
    render(
      <TodoContext.Provider value={mockContextValue}>
        <TodoForm />
      </TodoContext.Provider>
    );
    
    const titleInput = screen.getByLabelText(/title/i);
    await user.type(titleInput, 'Test Todo');
    expect(titleInput).toHaveValue('Test Todo');
    
    /* HINT: If this test fails, check that:
     * 1. Your input field correctly updates when the user types in it
     * 2. You're properly managing form state with useState or a similar approach
     */
  });

  it('submits form with correct data', async () => {
    const user = userEvent.setup();
    
    render(
      <TodoContext.Provider value={mockContextValue}>
        <TodoForm />
      </TodoContext.Provider>
    );

    await user.type(screen.getByLabelText(/title/i), 'New Todo');
    
    // If you have a description field:
    const descriptionInput = screen.queryByLabelText(/description/i);
    if (descriptionInput) {
      await user.type(descriptionInput, 'This is a test');
    }
    
    await user.click(screen.getByRole('button', { name: /add|create|submit/i }));

    expect(mockContextValue.addTodo).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Todo',
    }));
    
    /* HINT: If this test fails, check that:
     * 1. Your form has a submit button
     * 2. The form's onSubmit handler correctly calls the addTodo function
     * 3. You're passing the form data to addTodo
     */
  });

  it('handles edit mode correctly', async () => {
    const user = userEvent.setup();
    const editContextValue = {
      ...mockContextValue,
      selectedTodo: {
        id: 1,
        title: 'Edit Todo',
        description: 'This needs editing',
        completed: false
      }
    };

    render(
      <TodoContext.Provider value={editContextValue}>
        <TodoForm />
      </TodoContext.Provider>
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue('Edit Todo');
    
    await user.clear(screen.getByLabelText(/title/i));
    await user.type(screen.getByLabelText(/title/i), 'Updated Todo');
    
    await user.click(screen.getByRole('button', { name: /update|save|submit/i }));

    expect(mockContextValue.updateTodo).toHaveBeenCalledWith(
      1, 
      expect.objectContaining({ title: 'Updated Todo' })
    );
    
    /* HINT: If this test fails, check that:
     * 1. Your form populates with the selectedTodo data when in edit mode
     * 2. The form correctly updates the context when submitting an edit
     * 3. The form's title/button changes to indicate edit mode
     */
  });
});
