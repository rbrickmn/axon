import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FlashcardForm from './FlashcardForm';

describe('FlashcardForm', () => {
  const addFlashcard = jest.fn();

  it('submits the form with the correct data', () => {
    render(<FlashcardForm addFlashcard={addFlashcard} />);
    const questionInput = screen.getByPlaceholderText('Question');
    const answerInput = screen.getByPlaceholderText('Answer');
    const addButton = screen.getByText('Add Flashcard');

    fireEvent.change(questionInput, { target: { value: 'New Question' } });
    fireEvent.change(answerInput, { target: { value: 'New Answer' } });
    fireEvent.click(addButton);

    expect(addFlashcard).toHaveBeenCalledWith({
      question: 'New Question',
      answer: 'New Answer',
    });
  });
});
