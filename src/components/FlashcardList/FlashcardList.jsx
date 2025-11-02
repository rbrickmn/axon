import React from "react";
import Flashcard from "../Flashcard/Flashcard";

const FlashcardList = ({ flashcards, deleteFlashcard, editFlashcard }) => {
  return (
    <div>
      {flashcards.map((flashcard) => (
        <Flashcard
          key={flashcard.id}
          flashcard={flashcard}
          deleteFlashcard={deleteFlashcard}
          editFlashcard={editFlashcard}
        />
      ))}
    </div>
  );
};

export default FlashcardList;
