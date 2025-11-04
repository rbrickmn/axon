import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SetView from './SetView';

// Mock child components to isolate the SetView component
jest.mock('../components/FlashcardList/FlashcardList', () => ({ flashcards }) => (
  <div data-testid="flashcard-list">{flashcards.length} cards</div>
));
jest.mock('../components/FlashcardForm/FlashcardForm', () => ({ addFlashcard }) => (
  <form data-testid="flashcard-form" onSubmit={(e) => { e.preventDefault(); addFlashcard({ question: 'Q', answer: 'A' }); }}>
    <button type="submit">Add</button>
  </form>
));
jest.mock('../components/BatchImportForm/BatchImportForm', () => ({ toggleBatchImport }) => (
  <div data-testid="batch-import-form">
    <button onClick={toggleBatchImport}>Cancel</button>
  </div>
));

describe('SetView', () => {
  const mockSet = {
    id: 1,
    name: 'Test Set',
    description: 'A set for testing',
    flashcards: [
      { id: 101, question: 'Q1', answer: 'A1' },
      { id: 102, question: 'Q2', answer: 'A2' },
    ],
  };

  const mockDeselectSet = jest.fn();
  const mockAddFlashcard = jest.fn();
  const mockAddMultipleFlashcards = jest.fn();
  const mockDeleteFlashcard = jest.fn();
  const mockEditFlashcard = jest.fn();
  const mockEnterStudyMode = jest.fn();
  const mockToggleBatchImport = jest.fn();

  const defaultProps = {
    set: mockSet,
    deselectSet: mockDeselectSet,
    addFlashcard: mockAddFlashcard,
    addMultipleFlashcards: mockAddMultipleFlashcards,
    deleteFlashcard: mockDeleteFlashcard,
    editFlashcard: mockEditFlashcard,
    isStudyMode: false,
    enterStudyMode: mockEnterStudyMode,
    exitStudyMode: jest.fn(),
    isBatchImporting: false,
    toggleBatchImport: mockToggleBatchImport,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders set details and main controls', () => {
    render(<SetView {...defaultProps} />);
    expect(screen.getByRole('heading', { name: 'Test Set' })).toBeInTheDocument();
    expect(screen.getByText('A set for testing')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back to sets/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /study mode/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /batch import/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create flashcard/i })).toBeInTheDocument();
  });

  it('renders the FlashcardList with the correct number of cards', () => {
    render(<SetView {...defaultProps} />);
    expect(screen.getByTestId('flashcard-list')).toHaveTextContent('2 cards');
  });

  it('calls deselectSet when "Back to Sets" is clicked', async () => {
    render(<SetView {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: /back to sets/i }));
    expect(mockDeselectSet).toHaveBeenCalledTimes(1);
  });

  it('calls enterStudyMode when "Study Mode" is clicked', async () => {
    render(<SetView {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: /study mode/i }));
    expect(mockEnterStudyMode).toHaveBeenCalledTimes(1);
  });

  it('disables the Study Mode button when the set has no flashcards', () => {
    const emptySet = { ...mockSet, flashcards: [] };
    render(<SetView {...defaultProps} set={emptySet} />);
    const studyModeButton = screen.getByRole('button', { name: /study mode/i });
    expect(studyModeButton).toBeDisabled();
  });

  it('opens the Create Flashcard modal when the button is clicked', async () => {
    render(<SetView {...defaultProps} />);
    expect(screen.queryByTestId('flashcard-form')).not.toBeInTheDocument();
    
    await userEvent.click(screen.getByRole('button', { name: /create flashcard/i }));
    
    expect(screen.getByTestId('flashcard-form')).toBeInTheDocument();
  });

  it('calls addFlashcard and closes the modal on form submission', async () => {
    render(<SetView {...defaultProps} />);
    
    // Open modal
    await userEvent.click(screen.getByRole('button', { name: /create flashcard/i }));
    expect(screen.getByTestId('flashcard-form')).toBeInTheDocument();

    // Submit form (mocked)
    const form = screen.getByTestId('flashcard-form');
    fireEvent.submit(form);

    // Check that function was called and modal is closed
    expect(mockAddFlashcard).toHaveBeenCalledWith(mockSet.id, { question: 'Q', answer: 'A' });
    expect(screen.queryByTestId('flashcard-form')).not.toBeInTheDocument();
  });

  it('shows the BatchImportForm when isBatchImporting is true', () => {
    render(<SetView {...defaultProps} isBatchImporting={true} />);
    expect(screen.getByTestId('batch-import-form')).toBeInTheDocument();
    expect(screen.queryByTestId('flashcard-list')).not.toBeInTheDocument();
  });

  it('calls toggleBatchImport when switching to batch import mode', async () => {
    render(<SetView {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: /batch import/i }));
    expect(mockToggleBatchImport).toHaveBeenCalledTimes(1);
  });
});
