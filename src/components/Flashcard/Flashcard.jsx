import React, { useState } from 'react';
import EditFlashcardForm from '../EditFlashcardForm/EditFlashcardForm';

const Flashcard = ({ flashcard, deleteFlashcard, editFlashcard }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <EditFlashcardForm
          flashcard={flashcard}
          editFlashcard={editFlashcard}
          setIsEditing={setIsEditing}
        />
      ) : (
        <>
          <p>{flashcard.question}</p>
          <p>{flashcard.answer}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteFlashcard(flashcard.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Flashcard;
