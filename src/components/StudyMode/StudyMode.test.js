import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudyMode from './StudyMode';
import { shuffleArray } from '../../utils/shuffle';

// Mock the shuffle function to return a predictable order
jest.mock('../../utils/shuffle', () => ({
  shuffleArray: jest.fn((array) => [...array].reverse()),
}));

describe('StudyMode', () => {
  const mockFlashcards = [
    { id: 1, question: 'Question 1', answer: 'Answer 1' },
    { id: 2, question: 'Question 2', answer: 'Answer 2' },
    { id: 3, question: 'Question 3', answer: 'Answer 3' },
  ];
  const mockExitStudyMode = jest.fn();

  beforeEach(() => {
    // Clear mock history before each test
    mockExitStudyMode.mockClear();
    shuffleArray.mockClear();
    // Set up the mock implementation for each test
    shuffleArray.mockImplementation((array) => [...array].reverse());
  });

  it('renders the last card first due to mocked shuffle', () => {
    render(<StudyMode flashcards={mockFlashcards} exitStudyMode={mockExitStudyMode} />);
    expect(screen.getByText('Question 3')).toBeInTheDocument();
    expect(screen.getByText('Card 1 of 3')).toBeInTheDocument();
  });

  it('flips the card from question to answer on click', async () => {
    render(<StudyMode flashcards={mockFlashcards} exitStudyMode={mockExitStudyMode} />);
    const card = screen.getByText('Question 3').closest('.cursor-pointer');
    
    expect(screen.getByText('Question 3')).toBeInTheDocument();
    
    await userEvent.click(card);
    
    expect(screen.queryByText('Question 3')).not.toBeInTheDocument();
    expect(screen.getByText('Answer 3')).toBeInTheDocument();
    
    await userEvent.click(card);
    
    expect(screen.getByText('Question 3')).toBeInTheDocument();
  });

  it('navigates to the next card on "Next" button click', async () => {
    render(<StudyMode flashcards={mockFlashcards} exitStudyMode={mockExitStudyMode} />);
    
    // Initial card
    expect(screen.getByText('Question 3')).toBeInTheDocument();

    // Click Next
    const nextButton = screen.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    // Second card
    expect(screen.getByText('Question 2')).toBeInTheDocument();
    expect(screen.getByText('Card 2 of 3')).toBeInTheDocument();
  });

  it('navigates to the previous card on "Previous" button click', async () => {
    render(<StudyMode flashcards={mockFlashcards} exitStudyMode={mockExitStudyMode} />);
    
    // Initial card
    expect(screen.getByText('Question 3')).toBeInTheDocument();

    // Click Previous
    const previousButton = screen.getByRole('button', { name: /previous/i });
    await userEvent.click(previousButton);

    // Last card (wraps around)
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Card 3 of 3')).toBeInTheDocument();
  });

  it('wraps around to the first card when "Next" is clicked on the last card', async () => {
    render(<StudyMode flashcards={mockFlashcards} exitStudyMode={mockExitStudyMode} />);
    const nextButton = screen.getByRole('button', { name: /next/i });

    // Go to the last card
    await userEvent.click(nextButton); // -> Q2
    await userEvent.click(nextButton); // -> Q1

    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Card 3 of 3')).toBeInTheDocument();

    // Click Next again to wrap around
    await userEvent.click(nextButton);
    expect(screen.getByText('Question 3')).toBeInTheDocument();
    expect(screen.getByText('Card 1 of 3')).toBeInTheDocument();
  });

  it('calls exitStudyMode when the exit button is clicked', async () => {
    render(<StudyMode flashcards={mockFlashcards} exitStudyMode={mockExitStudyMode} />);
    
    const exitButton = screen.getByRole('button', { name: '' }); // The close button is an icon button
    await userEvent.click(exitButton);
    
    expect(mockExitStudyMode).toHaveBeenCalledTimes(1);
  });

  it('reshuffles the deck when the shuffle button is clicked', async () => {
    render(<StudyMode flashcards={mockFlashcards} exitStudyMode={mockExitStudyMode} />);
    
    // Initial shuffle on render
    // shuffleArray is called once in useState and once in useEffect
    expect(shuffleArray).toHaveBeenCalledTimes(2);
    expect(screen.getByText('Question 3')).toBeInTheDocument();

    // Set up a different shuffle result for the next call
    shuffleArray.mockImplementationOnce((array) => [...array]); // Return original order

    const shuffleButton = screen.getByRole('button', { name: /shuffle/i });
    await userEvent.click(shuffleButton);

    // Check that shuffle was called again and the card has changed
    expect(shuffleArray).toHaveBeenCalledTimes(3);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Card 1 of 3')).toBeInTheDocument();
  });

  it('resets to the first card and updates shuffle when flashcards prop changes', () => {
    const { rerender } = render(
      <StudyMode flashcards={mockFlashcards} exitStudyMode={mockExitStudyMode} />
    );
    // shuffleArray is called once in useState and once in useEffect
    expect(shuffleArray).toHaveBeenCalledTimes(2);
    expect(screen.getByText('Question 3')).toBeInTheDocument();

    const newFlashcards = [
      { id: 4, question: 'New Q1', answer: 'New A1' },
      { id: 5, question: 'New Q2', answer: 'New A2' },
    ];
    shuffleArray.mockImplementationOnce((array) => [...array].reverse());

    rerender(<StudyMode flashcards={newFlashcards} exitStudyMode={mockExitStudyMode} />);

    expect(shuffleArray).toHaveBeenCalledTimes(3);
    expect(screen.getByText('New Q2')).toBeInTheDocument();
    expect(screen.getByText('Card 1 of 2')).toBeInTheDocument();
  });
});