import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  const flashcards = [
    { id: 1, question: 'Q1', answer: 'A1' },
    { id: 2, question: 'Q2', answer: 'A2' },
  ];

  it('renders the HomePage component with flashcards', () => {
    render(
      <HomePage
        flashcards={flashcards}
        addFlashcard={() => {}}
        deleteFlashcard={() => {}}
        editFlashcard={() => {}}
        isStudyMode={false}
        enterStudyMode={() => {}}
        exitStudyMode={() => {}}
      />
    );
    expect(screen.getByText('Axon')).toBeInTheDocument();
    expect(screen.getByText('Study Mode')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Question')).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument();
    expect(screen.getByText('Q2')).toBeInTheDocument();
  });

it('renders the HomePage component in study mode', () => {
    render(
      <HomePage
        flashcards={flashcards}
        addFlashcard={() => {}}
        deleteFlashcard={() => {}}
        editFlashcard={() => {}}
        isStudyMode={true}
        enterStudyMode={() => {}}
        exitStudyMode={() => {}}
      />
    );
    expect(screen.getByText('Exit Study Mode')).toBeInTheDocument();
  });
});
