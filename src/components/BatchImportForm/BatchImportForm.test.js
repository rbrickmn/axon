import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BatchImportForm from './BatchImportForm';

describe('BatchImportForm', () => {
  const addMultipleFlashcards = jest.fn();
  const toggleBatchImport = jest.fn();

  it('submits the form with the correct data', () => {
    render(
      <BatchImportForm
        addMultipleFlashcards={addMultipleFlashcards}
        toggleBatchImport={toggleBatchImport}
      />
    );
    const textarea = screen.getByPlaceholderText('Paste your text here. Separate each flashcard with a new line.');
    const createButton = screen.getByText('Create Flashcards');

    const text = 'Q1: A1\n\nQ2: A2';
    fireEvent.change(textarea, { target: { value: text } });
    fireEvent.click(createButton);

    expect(addMultipleFlashcards).toHaveBeenCalledWith([
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ]);
    expect(toggleBatchImport).toHaveBeenCalled();
  });
});
