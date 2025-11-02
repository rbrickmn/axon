import React, { useState } from 'react';

const StudyMode = ({ flashcards, exitStudyMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div>
      <button onClick={exitStudyMode}>Exit Study Mode</button>
      <div>
        <p>{isFlipped ? currentFlashcard.answer : currentFlashcard.question}</p>
      </div>
      <button onClick={handleFlip}>Flip</button>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default StudyMode;
