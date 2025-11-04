import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SetListItem from './SetListItem';

// Mock child components
jest.mock('../EditSetForm/EditSetForm', () => (props) => (
  <div data-testid="edit-set-form">
    <button onClick={() => props.setIsEditing(false)}>Cancel</button>
  </div>
));

jest.mock('../ui/ConfirmationDialog', () => (props) => {
  if (!props.open) return null;
  return (
    <div data-testid="confirmation-dialog">
      <h1>{props.title}</h1>
      <button onClick={props.onConfirm}>Confirm</button>
      <button onClick={props.onClose}>Cancel</button>
    </div>
  );
});

describe('SetListItem', () => {
  const mockSet = { id: 1, name: 'Test Set', description: 'Test Description' };
  const mockEditSet = jest.fn();
  const mockDeleteSet = jest.fn();
  const mockSelectSet = jest.fn();

  const defaultProps = {
    set: mockSet,
    editSet: mockEditSet,
    deleteSet: mockDeleteSet,
    selectSet: mockSelectSet,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the set name and description', () => {
    render(<SetListItem {...defaultProps} />);
    expect(screen.getByText('Test Set')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders edit and delete buttons', () => {
    render(<SetListItem {...defaultProps} />);
    // Buttons are icon-only, so they don't have an accessible name by default
    // We find them by their visual container or a more specific selector if needed.
    // For now, we know there are two buttons in the footer.
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('calls selectSet when the card is clicked', async () => {
    render(<SetListItem {...defaultProps} />);
    await userEvent.click(screen.getByText('Test Set'));
    expect(mockSelectSet).toHaveBeenCalledTimes(1);
    expect(mockSelectSet).toHaveBeenCalledWith(mockSet.id);
  });

  it('switches to edit mode when the edit button is clicked', async () => {
    render(<SetListItem {...defaultProps} />);
    expect(screen.queryByTestId('edit-set-form')).not.toBeInTheDocument();

    // The edit button is the first button in the footer
    const editButton = screen.getAllByRole('button')[0];
    await userEvent.click(editButton);

    expect(screen.getByTestId('edit-set-form')).toBeInTheDocument();
    // Ensure clicking the card doesn't trigger selectSet in edit mode
    await userEvent.click(screen.getByTestId('edit-set-form'));
    expect(mockSelectSet).not.toHaveBeenCalled();
  });

  it('opens the delete confirmation dialog when the delete button is clicked', async () => {
    render(<SetListItem {...defaultProps} />);
    expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();

    // The delete button is the second button in the footer
    const deleteButton = screen.getAllByRole('button')[1];
    await userEvent.click(deleteButton);

    expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /are you sure/i })).toBeInTheDocument();
  });

  it('calls deleteSet when the confirmation dialog is confirmed', async () => {
    render(<SetListItem {...defaultProps} />);
    
    // Open the dialog
    const deleteButton = screen.getAllByRole('button')[1];
    await userEvent.click(deleteButton);
    expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await userEvent.click(confirmButton);

    expect(mockDeleteSet).toHaveBeenCalledTimes(1);
    expect(mockDeleteSet).toHaveBeenCalledWith(mockSet.id);
    expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
  });

  it('does not call deleteSet when the confirmation dialog is cancelled', async () => {
    render(<SetListItem {...defaultProps} />);
    
    // Open the dialog
    const deleteButton = screen.getAllByRole('button')[1];
    await userEvent.click(deleteButton);
    expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();

    // Cancel deletion
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(mockDeleteSet).not.toHaveBeenCalled();
    expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
  });
});