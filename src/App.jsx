import React, { useState } from 'react';
import HomePage from './pages/HomePage';

function App() {
  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      question: 'What is React?',
      answer: 'A JavaScript library for building user interfaces.',
    },
    {
      id: 2,
      question: 'What is JSX?',
      answer: 'A syntax extension for JavaScript.',
    },
  ]);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [isBatchImporting, setIsBatchImporting] = useState(false);

  const addFlashcard = (flashcard) => {
    setFlashcards([...flashcards, { ...flashcard, id: Date.now() }]);
  };

  const addMultipleFlashcards = (newFlashcards) => {
    const flashcardsWithIds = newFlashcards.map((flashcard) => ({
      ...flashcard,
      id: Date.now() + Math.random(),
    }));
    setFlashcards([...flashcards, ...flashcardsWithIds]);
  };

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
  };

  const editFlashcard = (id, updatedFlashcard) => {
    setFlashcards(
      flashcards.map((flashcard) =>
        flashcard.id === id ? { ...flashcard, ...updatedFlashcard } : flashcard
      )
    );
  };

  const enterStudyMode = () => {
    setIsStudyMode(true);
  };

  const exitStudyMode = () => {
    setIsStudyMode(false);
  };

  const toggleBatchImport = () => {
    setIsBatchImporting(!isBatchImporting);
  };

  return (
    <HomePage
      flashcards={flashcards}
      addFlashcard={addFlashcard}
      addMultipleFlashcards={addMultipleFlashcards}
      deleteFlashcard={deleteFlashcard}
      editFlashcard={editFlashcard}
      isStudyMode={isStudyMode}
      enterStudyMode={enterStudyMode}
      exitStudyMode={exitStudyMode}
      isBatchImporting={isBatchImporting}
      toggleBatchImport={toggleBatchImport}
    />
  );
}

export default App;

