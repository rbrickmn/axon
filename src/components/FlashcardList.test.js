import React from 'react';
import { render, screen } from '@testing-library/react';
import FlashcardList from './FlashcardList';

describe('FlashcardList', () => {
  const flashcards = [
    { id: 1, question: 'Q1', answer: 'A1' },
    { id: 2, question: 'Q2', answer: 'A2' },
  ];

  it('renders a list of flashcards', () => {
    render(
      <FlashcardList
        flashcards={flashcards}
        deleteFlashcard={() => {}}
        editFlashcard={() => {}}
      />
    );
    expect(screen.getByText('Q1')).toBeInTheDocument();
    expect(screen.getByText('Q2')).toBeInTheDocument();
  });
});
