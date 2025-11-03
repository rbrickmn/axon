import React from "react";
import Flashcard from "../Flashcard/Flashcard";

const FlashcardList = ({ flashcards, deleteFlashcard, editFlashcard }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
