import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudyMode from './StudyMode';

describe('StudyMode', () => {
  const flashcards = [
    { id: 1, question: 'Q1', answer: 'A1' },
    { id: 2, question: 'Q2', answer: 'A2' },
  ];
  const exitStudyMode = jest.fn();

  it('renders the first flashcard', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });

  it('flips the flashcard', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    fireEvent.click(screen.getByText('Flip'));
    expect(screen.getByText('A1')).toBeInTheDocument();
  });

  it('navigates to the next flashcard', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Q2')).toBeInTheDocument();
  });

  it('navigates to the previous flashcard', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });

  it('exits study mode', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    fireEvent.click(screen.getByText('Exit Study Mode'));
    expect(exitStudyMode).toHaveBeenCalled();
  });
});
