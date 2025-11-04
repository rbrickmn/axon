import React, { useState } from "react";
import FlashcardList from "../components/FlashcardList/FlashcardList";
import FlashcardForm from "../components/FlashcardForm/FlashcardForm";
import StudyMode from "../components/StudyMode/StudyMode";
import BatchImportForm from "../components/BatchImportForm/BatchImportForm";
import { Button } from "../components/ui/Button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Dialog } from "../components/ui/Dialog";

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
  const [isCreateFlashcardModalOpen, setIsCreateFlashcardModalOpen] = useState(false);

  const openCreateFlashcardModal = () => setIsCreateFlashcardModalOpen(true);
  const closeCreateFlashcardModal = () => setIsCreateFlashcardModalOpen(false);

  const handleAddFlashcard = (flashcard) => {
    addFlashcard(set.id, flashcard);
    closeCreateFlashcardModal();
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={deselectSet}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Sets
      </Button>
      <h1 className="text-3xl font-bold">{set.name}</h1>
      {set.description && <p className="text-muted-foreground">{set.description}</p>}
      {isBatchImporting ? (
        <BatchImportForm
          addMultipleFlashcards={(newFlashcards) =>
            addMultipleFlashcards(set.id, newFlashcards)
          }
          toggleBatchImport={toggleBatchImport}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
            <Button onClick={openCreateFlashcardModal}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Flashcard
            </Button>
          </div>
          <FlashcardList
            flashcards={set.flashcards}
            deleteFlashcard={(flashcardId) =>
              deleteFlashcard(set.id, flashcardId)
            }
            editFlashcard={(flashcardId, updatedFlashcard) =>
              editFlashcard(set.id, flashcardId, updatedFlashcard)
            }
          />
          <Dialog open={isCreateFlashcardModalOpen} onClose={closeCreateFlashcardModal}>
            <FlashcardForm addFlashcard={handleAddFlashcard} />
          </Dialog>
        </>
      )}
    </div>
  );
};

export default SetView;
