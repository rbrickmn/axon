import React, { useState, useEffect } from "react";
import { shuffleArray } from "../../utils/shuffle";
import { Button } from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { ArrowLeft, ArrowRight, RefreshCw, X } from "lucide-react";

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
    <div className="fixed inset-0 bg-background/95 z-50">
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="icon" onClick={exitStudyMode}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <Card className="w-full max-w-2xl cursor-pointer" onClick={handleFlip}>
          <CardContent className="flex items-center justify-center p-6 min-h-[300px] text-2xl font-semibold text-center">
            <p>{isFlipped ? currentFlashcard.answer : currentFlashcard.question}</p>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button variant="outline" onClick={handlePrevious}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Button variant="ghost" onClick={handleShuffle}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
        </div>
        <p className="text-muted-foreground mt-4">
          Card {currentIndex + 1} of {shuffledFlashcards.length}
        </p>
      </div>
    </div>
  );
};

export default StudyMode;
