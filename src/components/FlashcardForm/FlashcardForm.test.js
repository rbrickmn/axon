import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FlashcardForm from './FlashcardForm';

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

describe('FlashcardForm', () => {
  const mockAddFlashcard = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with question and answer fields', () => {
    render(<FlashcardForm addFlashcard={mockAddFlashcard} />);
    expect(screen.getByRole('heading', { name: /create a new flashcard/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/question/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/answer/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add flashcard/i })).toBeInTheDocument();
  });

  it('allows typing in the question and answer fields', async () => {
    render(<FlashcardForm addFlashcard={mockAddFlashcard} />);
    const questionInput = screen.getByLabelText(/question/i);
    const answerInput = screen.getByLabelText(/answer/i);

    await userEvent.type(questionInput, 'What is React?');
    await userEvent.type(answerInput, 'A JavaScript library for building user interfaces.');

    expect(questionInput).toHaveValue('What is React?');
    expect(answerInput).toHaveValue('A JavaScript library for building user interfaces.');
  });

  it('calls addFlashcard with trimmed input and clears fields on successful submission', async () => {
    render(<FlashcardForm addFlashcard={mockAddFlashcard} />);
    const questionInput = screen.getByLabelText(/question/i);
    const answerInput = screen.getByLabelText(/answer/i);
    const submitButton = screen.getByRole('button', { name: /add flashcard/i });

    await userEvent.type(questionInput, '  Leading and trailing spaces  ');
    await userEvent.type(answerInput, '  Should be trimmed  ');
    await userEvent.click(submitButton);

    expect(mockAddFlashcard).toHaveBeenCalledTimes(1);
    expect(mockAddFlashcard).toHaveBeenCalledWith({
      question: 'Leading and trailing spaces',
      answer: 'Should be trimmed',
    });

    // Check that fields are cleared
    expect(questionInput).toHaveValue('');
    expect(answerInput).toHaveValue('');
  });

  it('does not call addFlashcard and shows an alert if the question is empty', async () => {
    render(<FlashcardForm addFlashcard={mockAddFlashcard} />);
    const answerInput = screen.getByLabelText(/answer/i);
    const submitButton = screen.getByRole('button', { name: /add flashcard/i });

    await userEvent.type(answerInput, 'Some Answer');
    await userEvent.click(submitButton);

    expect(mockAddFlashcard).not.toHaveBeenCalled();
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /invalid input/i })).toBeInTheDocument();
  });

  it('does not call addFlashcard and shows an alert if the answer is empty', async () => {
    render(<FlashcardForm addFlashcard={mockAddFlashcard} />);
    const questionInput = screen.getByLabelText(/question/i);
    const submitButton = screen.getByRole('button', { name: /add flashcard/i });

    await userEvent.type(questionInput, 'Some Question');
    await userEvent.click(submitButton);

    expect(mockAddFlashcard).not.toHaveBeenCalled();
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();
  });

  it('closes the alert when the close button is clicked', async () => {
    render(<FlashcardForm addFlashcard={mockAddFlashcard} />);
    const submitButton = screen.getByRole('button', { name: /add flashcard/i });

    // Submit with empty fields to trigger the alert
    await userEvent.click(submitButton);
    expect(screen.getByTestId('alert-dialog')).toBeInTheDocument();

    // Close the alert
    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    expect(screen.queryByTestId('alert-dialog')).not.toBeInTheDocument();
  });
});