import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SetForm from './SetForm';

// Mock the AlertDialog component
jest.mock('../ui/AlertDialog', () => ({ open, onClose, title, description }) => {
  if (!open) return null;
  return (
    <div data-testid="alert-dialog">
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
});

describe('SetForm', () => {
  const mockAddSet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with name and description fields', () => {
    render(<SetForm addSet={mockAddSet} />);
    expect(screen.getByRole('heading', { name: /create a new set/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/set name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add set/i })).toBeInTheDocument();
  });

  it('calls addSet and clears fields on successful submission', async () => {
    render(<SetForm addSet={mockAddSet} />);
    const nameInput = screen.getByLabelText(/set name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addButton = screen.getByRole('button', { name: /add set/i });

    await userEvent.type(nameInput, 'New Set');
    await userEvent.type(descriptionInput, 'New Description');
    await userEvent.click(addButton);

    expect(mockAddSet).toHaveBeenCalledTimes(1);
    expect(mockAddSet).toHaveBeenCalledWith('New Set', 'New Description');
    expect(nameInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
  });

  it('successfully submits with a name and no description', async () => {
    render(<SetForm addSet={mockAddSet} />);
    const nameInput = screen.getByLabelText(/set name/i);
    const addButton = screen.getByRole('button', { name: /add set/i });

    await userEvent.type(nameInput, 'Just a Name');
    await userEvent.click(addButton);

    expect(mockAddSet).toHaveBeenCalledTimes(1);
    expect(mockAddSet).toHaveBeenCalledWith('Just a Name', '');
    expect(nameInput).toHaveValue('');
  });

  it('trims whitespace from name and description on submission', async () => {
    render(<SetForm addSet={mockAddSet} />);
    const nameInput = screen.getByLabelText(/set name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addButton = screen.getByRole('button', { name: /add set/i });

    await userEvent.type(nameInput, '  Spaced Name  ');
    await userEvent.type(descriptionInput, '  Spaced Description  ');
    await userEvent.click(addButton);

    expect(mockAddSet).toHaveBeenCalledWith('Spaced Name', 'Spaced Description');
  });

  it('shows an alert and does not submit if the name is empty', async () => {
    render(<SetForm addSet={mockAddSet} />);
    const addButton = screen.getByRole('button', { name: /add set/i });

    await userEvent.click(addButton);

    expect(mockAddSet).not.toHaveBeenCalled();
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /invalid input/i })).toBeInTheDocument();
  });

  it('shows an alert and does not submit if the name is only whitespace', async () => {
    render(<SetForm addSet={mockAddSet} />);
    const nameInput = screen.getByLabelText(/set name/i);
    const addButton = screen.getByRole('button', { name: /add set/i });

    await userEvent.type(nameInput, '   ');
    await userEvent.click(addButton);

    expect(mockAddSet).not.toHaveBeenCalled();
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();
  });
});