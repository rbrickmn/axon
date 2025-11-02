import React from 'react';
import FlashcardList from '../components/FlashcardList';
import FlashcardForm from '../components/FlashcardForm';

const HomePage = ({ flashcards, addFlashcard, deleteFlashcard }) => {
  return (
    <div>
      <h1>Axon</h1>
      <FlashcardForm addFlashcard={addFlashcard} />
      <FlashcardList flashcards={flashcards} deleteFlashcard={deleteFlashcard} />
    </div>
  );
};

export default HomePage;
