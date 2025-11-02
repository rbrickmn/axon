import React, { useState } from 'react';
import { parseFlashcards } from '../../utils/parseFlashcards';

const BatchImportForm = ({ addMultipleFlashcards, toggleBatchImport }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFlashcards = parseFlashcards(text);
    if (newFlashcards.length > 0) {
      addMultipleFlashcards(newFlashcards);
      alert(`${newFlashcards.length} flashcards created successfully!`);
      setText('');
      toggleBatchImport();
    } else {
      alert('Could not parse any flashcards. Please check the format of your text.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here. Separate each flashcard with a new line."
        rows="10"
        cols="50"
      />
      <button type="submit">Create Flashcards</button>
      <button type="button" onClick={toggleBatchImport}>
        Cancel
      </button>
    </form>
  );
};

export default BatchImportForm;
