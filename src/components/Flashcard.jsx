import React from 'react';

const Flashcard = ({ flashcard, deleteFlashcard }) => {
  return (
    <div>
      <p>{flashcard.question}</p>
      <p>{flashcard.answer}</p>
      <button onClick={() => deleteFlashcard(flashcard.id)}>Delete</button>
    </div>
  );
};

export default Flashcard;
