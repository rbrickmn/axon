import React from 'react';
import { render, screen } from '@testing-library/react';
import SetView from './SetView';

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
  const mockExitStudyMode = jest.fn();
  const mockToggleBatchImport = jest.fn();

  it('renders the SetView component with flashcards', () => {
    render(
      <SetView
        set={mockSet}
        deselectSet={mockDeselectSet}
        addFlashcard={mockAddFlashcard}
        addMultipleFlashcards={mockAddMultipleFlashcards}
        deleteFlashcard={mockDeleteFlashcard}
        editFlashcard={mockEditFlashcard}
        isStudyMode={false}
        enterStudyMode={mockEnterStudyMode}
        exitStudyMode={mockExitStudyMode}
        isBatchImporting={false}
        toggleBatchImport={mockToggleBatchImport}
      />
    );
    expect(screen.getByText('Test Set')).toBeInTheDocument();
    expect(screen.getByText('Study Mode')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Question')).toBeInTheDocument();
    expect(screen.getByText('Q1')).toBeInTheDocument();
    expect(screen.getByText('Q2')).toBeInTheDocument();
  });

  it('renders the SetView component in study mode', () => {
    render(
      <SetView
        set={mockSet}
        deselectSet={mockDeselectSet}
        addFlashcard={mockAddFlashcard}
        addMultipleFlashcards={mockAddMultipleFlashcards}
        deleteFlashcard={mockDeleteFlashcard}
        editFlashcard={mockEditFlashcard}
        isStudyMode={true}
        enterStudyMode={mockEnterStudyMode}
        exitStudyMode={mockExitStudyMode}
        isBatchImporting={false}
        toggleBatchImport={mockToggleBatchImport}
      />
    );
    expect(screen.getByText('Exit Study Mode')).toBeInTheDocument();
  });

  it('disables and fades the Study Mode button when the set is empty', () => {
    const emptySet = { ...mockSet, flashcards: [] };
    render(
      <SetView
        set={emptySet}
        deselectSet={mockDeselectSet}
        addFlashcard={mockAddFlashcard}
        addMultipleFlashcards={mockAddMultipleFlashcards}
        deleteFlashcard={mockDeleteFlashcard}
        editFlashcard={mockEditFlashcard}
        isStudyMode={false}
        enterStudyMode={mockEnterStudyMode}
        exitStudyMode={mockExitStudyMode}
        isBatchImporting={false}
        toggleBatchImport={mockToggleBatchImport}
      />
    );
    const studyModeButton = screen.getByText('Study Mode');
    expect(studyModeButton).toBeDisabled();
    expect(studyModeButton).toHaveStyle('opacity: 0.5');
  });
});