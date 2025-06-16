import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import TaskList from '../TaskList'; // der richtige Pfad!
import axios from 'axios'; // wichtig: axios mocken!

// Axios wird gemockt
vi.mock('axios');

describe('TaskList', () => {
  const toggleTaskDone = vi.fn();
  const deleteTask = vi.fn();

  it('zeigt Hinweis, wenn keine Aufgaben vorhanden sind', () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <TaskList
        toggleTaskDone={toggleTaskDone}
        deleteTask={deleteTask}
        selectedDate="2024-04-25"
      />
    );

    expect(screen.getByText(/noch keine Aufgaben vorhanden/i)).toBeInTheDocument();
  });

  it('rendert Aufgaben vom Server (mocked)', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, text: 'Task 1', completed: false, deadline: '2024-04-25' },
        { id: 2, text: 'Task 2', completed: true, deadline: '2024-04-26' }
      ]
    });

    render(
      <TaskList
        toggleTaskDone={toggleTaskDone}
        deleteTask={deleteTask}
        selectedDate="2024-04-25"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });
});
