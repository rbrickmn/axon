import React, { useState } from 'react';

const EditFlashcardForm = ({ flashcard, editFlashcard, setIsEditing }) => {
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim any whitespace from the input fields
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    // If either field is empty, show an alert and return
    if (!trimmedQuestion || !trimmedAnswer) {
      alert('Please fill out all fields');
      return;
    }

    // Edit the flashcard
    editFlashcard(flashcard.id, { question: trimmedQuestion, answer: trimmedAnswer });

    // Close the edit form
    setIsEditing(false);
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
      <button type="submit">Save</button>
      <button type="button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );
};

export default EditFlashcardForm;
