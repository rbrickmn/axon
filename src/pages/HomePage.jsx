import React from 'react';
import FlashcardList from '../components/FlashcardList';
import FlashcardForm from '../components/FlashcardForm';
import StudyMode from '../components/StudyMode';

const HomePage = ({
  flashcards,
  addFlashcard,
  deleteFlashcard,
  editFlashcard,
  isStudyMode,
  enterStudyMode,
  exitStudyMode,
}) => {
  return (
    <div>
      <h1>Axon</h1>
      {isStudyMode ? (
        <StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />
      ) : (
        <>
          <button onClick={enterStudyMode}>Study Mode</button>
          <FlashcardForm addFlashcard={addFlashcard} />
          <FlashcardList
            flashcards={flashcards}
            deleteFlashcard={deleteFlashcard}
            editFlashcard={editFlashcard}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
