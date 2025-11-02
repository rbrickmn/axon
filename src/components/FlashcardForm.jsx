import React, { useState } from "react";

const FlashcardForm = ({ addFlashcard }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim any whitespace from the input fields
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    // If either field is empty, show an alert and return
    if (!trimmedQuestion || !trimmedAnswer) {
      alert("Please fill out all fields");
      return;
    }

    // Add the flashcard to the list
    addFlashcard({ question: trimmedQuestion, answer: trimmedAnswer });

    // Clear the input fields
    setQuestion("");
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit">Add Flashcard</button>
    </form>
  );
};

export default FlashcardForm;
