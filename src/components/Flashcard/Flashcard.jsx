import React, { useState } from 'react';
import EditFlashcardForm from '../EditFlashcardForm/EditFlashcardForm';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import ConfirmationDialog from '../ui/ConfirmationDialog';
import { Edit, Trash2 } from 'lucide-react'; // Import icons

const Flashcard = ({ flashcard, deleteFlashcard, editFlashcard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDelete = () => {
    deleteFlashcard(flashcard.id);
    setIsConfirmingDelete(false);
  };

  return (
    <>
      <Card className="flex flex-col h-full">
        {isEditing ? (
          <EditFlashcardForm
            flashcard={flashcard}
            editFlashcard={editFlashcard}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <CardContent className="flex-grow p-6 space-y-2">
              <p className="font-semibold">{flashcard.question}</p>
              <p>{flashcard.answer}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="secondary"
                size="icon" // Set size to icon
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                <Edit className="h-4 w-4" /> {/* Edit icon */}
              </Button>
              <Button
                variant="destructive"
                size="icon" // Set size to icon
                onClick={(e) => {
                  e.stopPropagation();
                  setIsConfirmingDelete(true);
                }}
              >
                <Trash2 className="h-4 w-4" /> {/* Trash2 icon */}
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
      <ConfirmationDialog
        open={isConfirmingDelete}
        onClose={() => setIsConfirmingDelete(false)}
        onConfirm={handleDelete}
        title="Are you sure?"
        description="This will permanently delete this flashcard."
      />
    </>
  );
};

export default Flashcard;