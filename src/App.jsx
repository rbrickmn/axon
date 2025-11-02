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

  return (
    <HomePage
      flashcards={flashcards}
      addFlashcard={addFlashcard}
      deleteFlashcard={deleteFlashcard}
    />
  );
}

export default App;
