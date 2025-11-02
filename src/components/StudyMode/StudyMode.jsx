import React, { useState, useEffect } from "react";
import { shuffleArray } from "../../utils/shuffle";

const StudyMode = ({ flashcards, exitStudyMode }) => {
  // Create a shuffled copy when component mounts or flashcards change
  const [shuffledFlashcards, setShuffledFlashcards] = useState(() =>
    shuffleArray(flashcards)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Reshuffle if flashcards prop changes
  useEffect(() => {
    setShuffledFlashcards(shuffleArray(flashcards));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [flashcards]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledFlashcards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + shuffledFlashcards.length) % shuffledFlashcards.length
    );
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShuffle = () => {
    const reshuffled = shuffleArray(flashcards);
    setShuffledFlashcards(reshuffled);
    setCurrentIndex(0); // Reset to first card after shuffle
    setIsFlipped(false);
  };

  const currentFlashcard = shuffledFlashcards[currentIndex];

  return (
    <div>
      <button onClick={exitStudyMode}>Exit Study Mode</button>
      <button onClick={handleShuffle}>Shuffle</button>
      <div>
        <p>{isFlipped ? currentFlashcard.answer : currentFlashcard.question}</p>
      </div>
      <button onClick={handleFlip}>Flip</button>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <p>
        Card {currentIndex + 1} of {shuffledFlashcards.length}
      </p>
    </div>
  );
};

export default StudyMode;
