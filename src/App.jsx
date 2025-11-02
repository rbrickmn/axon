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

  const addFlashcard = (flashcard) => {
    setFlashcards([...flashcards, { ...flashcard, id: Date.now() }]);
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

  return (
    <HomePage
      flashcards={flashcards}
      addFlashcard={addFlashcard}
      deleteFlashcard={deleteFlashcard}
      editFlashcard={editFlashcard}
    />
  );
}

export default App;
