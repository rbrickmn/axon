import React from 'react';
import FlashcardList from '../components/FlashcardList/FlashcardList';
import FlashcardForm from '../components/FlashcardForm/FlashcardForm';
import StudyMode from '../components/StudyMode/StudyMode';
import BatchImportForm from '../components/BatchImportForm/BatchImportForm';

const HomePage = ({
  flashcards,
  addFlashcard,
  addMultipleFlashcards,
  deleteFlashcard,
  editFlashcard,
  isStudyMode,
  enterStudyMode,
  exitStudyMode,
  isBatchImporting,
  toggleBatchImport,
}) => {
  return (
    <div>
      <h1>Axon</h1>
      {isStudyMode ? (
        <StudyMode flashcards={flashcards} exitStudyMode={exitStudyMode} />
      ) : isBatchImporting ? (
        <BatchImportForm
          addMultipleFlashcards={addMultipleFlashcards}
          toggleBatchImport={toggleBatchImport}
        />
      ) : (
        <>
          <button onClick={enterStudyMode}>Study Mode</button>
          <button onClick={toggleBatchImport}>Batch Import</button>
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
