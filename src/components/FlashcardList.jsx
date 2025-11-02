import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ flashcards, deleteFlashcard }) => {
  return (
    <div>
      {flashcards.map((flashcard) => (
        <Flashcard
          key={flashcard.id}
          flashcard={flashcard}
          deleteFlashcard={deleteFlashcard}
        />
      ))}
    </div>
  );
};

export default FlashcardList;
