import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudyMode from './StudyMode';
import { shuffleArray } from '../../utils/shuffle';

jest.mock('../../utils/shuffle', () => ({
  shuffleArray: jest.fn((array) => [...array].reverse()),
}));

describe('StudyMode', () => {
  const flashcards = [
    { id: 1, question: 'Q1', answer: 'A1' },
    { id: 2, question: 'Q2', answer: 'A2' },
  ];
  const exitStudyMode = jest.fn();

  beforeEach(() => {
    shuffleArray.mockClear();
  });

  it('renders the first flashcard of the shuffled deck', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    expect(screen.getByText('Q2')).toBeInTheDocument();
  });

  it('flips the flashcard', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    fireEvent.click(screen.getByText('Flip'));
    expect(screen.getByText('A2')).toBeInTheDocument();
  });

  it('navigates to the next flashcard', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });

  it('navigates to the previous flashcard', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Q1')).toBeInTheDocument();
  });

  it('exits study mode', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    fireEvent.click(screen.getByText('Exit Study Mode'));
    expect(exitStudyMode).toHaveBeenCalled();
  });

  it('shuffles the deck when shuffle button is clicked', () => {
    render(<StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />);
    shuffleArray.mockClear(); // Clear mock calls from initial render
    fireEvent.click(screen.getByText('Shuffle'));
    expect(shuffleArray).toHaveBeenCalledTimes(1);
  });
});
