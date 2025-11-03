import React from "react";
import FlashcardList from "../components/FlashcardList/FlashcardList";
import FlashcardForm from "../components/FlashcardForm/FlashcardForm";
import StudyMode from "../components/StudyMode/StudyMode";
import BatchImportForm from "../components/BatchImportForm/BatchImportForm";
import { Button } from "../components/ui/Button";
import { ArrowLeft } from "lucide-react";

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
    <div className="space-y-6">
      <Button variant="outline" onClick={deselectSet}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Sets
      </Button>
      <h1 className="text-3xl font-bold">{set.name}</h1>
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
          <div className="flex gap-2">
            <Button
              onClick={enterStudyMode}
              disabled={set.flashcards.length === 0}
            >
              Study Mode
            </Button>
            <Button variant="secondary" onClick={toggleBatchImport}>
              Batch Import
            </Button>
          </div>
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
