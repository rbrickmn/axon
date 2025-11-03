import React, { useState } from 'react';
import EditFlashcardForm from '../EditFlashcardForm/EditFlashcardForm';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import ConfirmationDialog from '../ui/ConfirmationDialog';

const Flashcard = ({ flashcard, deleteFlashcard, editFlashcard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDelete = () => {
    deleteFlashcard(flashcard.id);
    setIsConfirmingDelete(false);
  };

  return (
    <>
      <Card>
        {isEditing ? (
          <EditFlashcardForm
            flashcard={flashcard}
            editFlashcard={editFlashcard}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <CardContent className="p-6 space-y-2">
              <p className="font-semibold">{flashcard.question}</p>
              <p>{flashcard.answer}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
              <Button variant="destructive" onClick={() => setIsConfirmingDelete(true)}>Delete</Button>
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
