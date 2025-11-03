import React from 'react';
import FlashcardList from '../components/FlashcardList/FlashcardList';
import FlashcardForm from '../components/FlashcardForm/FlashcardForm';
import StudyMode from '../components/StudyMode/StudyMode';
import BatchImportForm from '../components/BatchImportForm/BatchImportForm';

const SetView = ({
  set,
  deselectSet,
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
      <button onClick={deselectSet}>Back to Sets</button>
      <h1>{set.name}</h1>
      {isStudyMode ? (
        <StudyMode flashcards={set.flashcards} exitStudyMode={exitStudyMode} />
      ) : isBatchImporting ? (
        <BatchImportForm
          addMultipleFlashcards={(newFlashcards) =>
            addMultipleFlashcards(set.id, newFlashcards)
          }
          toggleBatchImport={toggleBatchImport}
        />
      ) : (
        <>
          <button onClick={enterStudyMode}>Study Mode</button>
          <button onClick={toggleBatchImport}>Batch Import</button>
          <FlashcardForm
            addFlashcard={(flashcard) => addFlashcard(set.id, flashcard)}
          />
          <FlashcardList
            flashcards={set.flashcards}
            deleteFlashcard={(flashcardId) =>
              deleteFlashcard(set.id, flashcardId)
            }
            editFlashcard={(flashcardId, updatedFlashcard) =>
              editFlashcard(set.id, flashcardId, updatedFlashcard)
            }
          />
        </>
      )}
    </div>
  );
};

export default SetView;
