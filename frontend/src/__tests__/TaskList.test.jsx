import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from '../TaskList';


describe('TaskList', () => {
  const dummyTasks = [
    { id: 1, text: 'Task 1', done: false, deadline: '2024-04-25' },
    { id: 2, text: 'Task 2', done: true, deadline: '2024-04-26' },
  ];

  const toggleTaskDone = vi.fn();
  const deleteTask = vi.fn();

  it('zeigt einen Hinweis, wenn keine Aufgaben vorhanden sind', () => {
    render(<TaskList tasks={[]} toggleTaskDone={toggleTaskDone} deleteTask={deleteTask} selectedDate="2024-04-25" />);
    expect(screen.getByText(/noch keine Aufgaben vorhanden/i)).toBeInTheDocument();
  });

  it('rendert alle übergebenen Aufgaben', () => {
    render(<TaskList tasks={dummyTasks} toggleTaskDone={toggleTaskDone} deleteTask={deleteTask} selectedDate="2024-04-25" />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
