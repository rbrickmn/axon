import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditSetForm from './EditSetForm';

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

describe('EditSetForm', () => {
  const mockSet = { id: 1, name: 'Original Name', description: 'Original Description' };
  const mockEditSet = jest.fn();
  const mockSetIsEditing = jest.fn();

  const defaultProps = {
    set: mockSet,
    editSet: mockEditSet,
    setIsEditing: mockSetIsEditing,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the initial set name and description', () => {
    render(<EditSetForm {...defaultProps} />);
    expect(screen.getByLabelText(/set name/i)).toHaveValue(mockSet.name);
    expect(screen.getByLabelText(/description/i)).toHaveValue(mockSet.description);
  });

  it('allows updating the name and description fields', async () => {
    render(<EditSetForm {...defaultProps} />);
    const nameInput = screen.getByLabelText(/set name/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Name');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Updated Description');

    expect(nameInput).toHaveValue('Updated Name');
    expect(descriptionInput).toHaveValue('Updated Description');
  });

  it('calls editSet and setIsEditing with the new values on save', async () => {
    render(<EditSetForm {...defaultProps} />);
    const nameInput = screen.getByLabelText(/set name/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const saveButton = screen.getByRole('button', { name: /save/i });

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Name');
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, 'Updated Description');
    await userEvent.click(saveButton);

    expect(mockEditSet).toHaveBeenCalledTimes(1);
    expect(mockEditSet).toHaveBeenCalledWith(1, 'Updated Name', 'Updated Description');
    expect(mockSetIsEditing).toHaveBeenCalledTimes(1);
    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
  });

  it('calls setIsEditing with false when the Cancel button is clicked', async () => {
    render(<EditSetForm {...defaultProps} />);
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(mockSetIsEditing).toHaveBeenCalledTimes(1);
    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
    expect(mockEditSet).not.toHaveBeenCalled();
  });

  it('shows an alert and does not submit if the name is empty', async () => {
    render(<EditSetForm {...defaultProps} />);
    const nameInput = screen.getByLabelText(/set name/i);
    const saveButton = screen.getByRole('button', { name: /save/i });

    await userEvent.clear(nameInput);
    await userEvent.click(saveButton);

    expect(mockEditSet).not.toHaveBeenCalled();
    expect(mockSetIsEditing).not.toHaveBeenCalled();
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /invalid input/i })).toBeInTheDocument();
  });

  it('shows an alert and does not submit if the name is only whitespace', async () => {
    render(<EditSetForm {...defaultProps} />);
    const nameInput = screen.getByLabelText(/set name/i);
    const saveButton = screen.getByRole('button', { name: /save/i });

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, '   '); // Just spaces
    await userEvent.click(saveButton);

    expect(mockEditSet).not.toHaveBeenCalled();
    expect(mockSetIsEditing).not.toHaveBeenCalled();
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();
  });
});