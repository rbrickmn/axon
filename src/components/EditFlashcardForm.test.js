import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditFlashcardForm from './EditFlashcardForm';

describe('EditFlashcardForm', () => {
  const flashcard = { id: 1, question: 'Q1', answer: 'A1' };
  const editFlashcard = jest.fn();
  const setIsEditing = jest.fn();

  it('submits the form with the correct data', () => {
    render(
      <EditFlashcardForm
        flashcard={flashcard}
        editFlashcard={editFlashcard}
        setIsEditing={setIsEditing}
      />
    );
    const questionInput = screen.getByDisplayValue('Q1');
    const answerInput = screen.getByDisplayValue('A1');
    const saveButton = screen.getByText('Save');

    fireEvent.change(questionInput, { target: { value: 'Updated Question' } });
    fireEvent.change(answerInput, { target: { value: 'Updated Answer' } });
    fireEvent.click(saveButton);

    expect(editFlashcard).toHaveBeenCalledWith(1, {
      question: 'Updated Question',
      answer: 'Updated Answer',
    });
    expect(setIsEditing).toHaveBeenCalledWith(false);
  });
});
