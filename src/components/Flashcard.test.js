import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Flashcard from './Flashcard';

describe('Flashcard', () => {
  const flashcard = { id: 1, question: 'Q1', answer: 'A1' };
  const deleteFlashcard = jest.fn();
  const editFlashcard = jest.fn();

  it('renders the flashcard content', () => {
    render(
      <Flashcard
        flashcard={flashcard}
        deleteFlashcard={deleteFlashcard}
        editFlashcard={editFlashcard}
      />
    );
    expect(screen.getByText('Q1')).toBeInTheDocument();
    expect(screen.getByText('A1')).toBeInTheDocument();
  });

  it('calls deleteFlashcard when delete button is clicked', () => {
    render(
      <Flashcard
        flashcard={flashcard}
        deleteFlashcard={deleteFlashcard}
        editFlashcard={editFlashcard}
      />
    );
    fireEvent.click(screen.getByText('Delete'));
    expect(deleteFlashcard).toHaveBeenCalledWith(1);
  });

  it('switches to edit mode when edit button is clicked', () => {
    render(
      <Flashcard
        flashcard={flashcard}
        deleteFlashcard={deleteFlashcard}
        editFlashcard={editFlashcard}
      />
    );
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
