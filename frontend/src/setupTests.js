import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Define mock handlers for API requests during testing
export const handlers = [
  // GET /todos
  rest.get('/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: "Learn Flask",
          description: "Study Flask for backend development",
          completed: false,
          due_date: "2023-12-31",
          created_at: "2023-01-01"
        }
      ])
    );
  }),

  // POST /todos
  rest.post('/todos', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(201),
      ctx.json({ id: 2, ...body, created_at: new Date().toISOString() })
    );
  }),

  // PUT /todos/:id
  rest.put('/todos/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const body = await req.json();
    return res(
      ctx.status(200),
      ctx.json({ id: Number(id), ...body })
    );
  }),

  // DELETE /todos/:id
  rest.delete('/todos/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Todo deleted successfully' })
    );
  }),
];

const server = setupServer(...handlers);

// Start the server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset any runtime handlers tests may use
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
