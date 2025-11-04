import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Flashcard from './Flashcard';

// Mock child components
jest.mock('../EditFlashcardForm/EditFlashcardForm', () => (props) => (
  <div data-testid="edit-flashcard-form">
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

describe('Flashcard', () => {
  const mockFlashcard = { id: 1, question: 'Test Question', answer: 'Test Answer' };
  const mockDeleteFlashcard = jest.fn();
  const mockEditFlashcard = jest.fn();

  const defaultProps = {
    flashcard: mockFlashcard,
    deleteFlashcard: mockDeleteFlashcard,
    editFlashcard: mockEditFlashcard,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the flashcard question and answer', () => {
    render(<Flashcard {...defaultProps} />);
    expect(screen.getByText('Test Question')).toBeInTheDocument();
    expect(screen.getByText('Test Answer')).toBeInTheDocument();
  });

  it('switches to edit mode when the edit button is clicked', async () => {
    render(<Flashcard {...defaultProps} />);
    expect(screen.queryByTestId('edit-flashcard-form')).not.toBeInTheDocument();

    const editButton = screen.getAllByRole('button')[0];
    await userEvent.click(editButton);

    expect(screen.getByTestId('edit-flashcard-form')).toBeInTheDocument();
  });

  it('opens the delete confirmation dialog when the delete button is clicked', async () => {
    render(<Flashcard {...defaultProps} />);
    expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();

    const deleteButton = screen.getAllByRole('button')[1];
    await userEvent.click(deleteButton);

    expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /are you sure/i })).toBeInTheDocument();
  });

  it('calls deleteFlashcard when the confirmation dialog is confirmed', async () => {
    render(<Flashcard {...defaultProps} />);
    
    const deleteButton = screen.getAllByRole('button')[1];
    await userEvent.click(deleteButton);
    
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await userEvent.click(confirmButton);

    expect(mockDeleteFlashcard).toHaveBeenCalledTimes(1);
    expect(mockDeleteFlashcard).toHaveBeenCalledWith(mockFlashcard.id);
    expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
  });

  it('does not call deleteFlashcard when the confirmation dialog is cancelled', async () => {
    render(<Flashcard {...defaultProps} />);
    
    const deleteButton = screen.getAllByRole('button')[1];
    await userEvent.click(deleteButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(mockDeleteFlashcard).not.toHaveBeenCalled();
    expect(screen.queryByTestId('confirmation-dialog')).not.toBeInTheDocument();
  });
});