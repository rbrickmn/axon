import React, { useState } from 'react';
import EditSetForm from '../EditSetForm/EditSetForm';
import { Button } from '../ui/Button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import ConfirmationDialog from '../ui/ConfirmationDialog';
import { Edit, Trash2 } from 'lucide-react'; // Import icons

const SetListItem = ({ set, editSet, deleteSet, selectSet }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDelete = () => {
    deleteSet(set.id);
    setIsConfirmingDelete(false);
  };

  return (
    <>
      <Card
        className="cursor-pointer hover:scale-[1.02] transition-transform duration-200 ease-in-out"
        onClick={() => !isEditing && selectSet(set.id)} // Only select if not editing
      >
        {isEditing ? (
          <EditSetForm
            set={set}
            editSet={editSet}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <CardHeader>
              <CardTitle>{set.name}</CardTitle>
              <CardDescription>{set.description}</CardDescription>
            </CardHeader>
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
        description={`This will permanently delete the "${set.name}" set and all its flashcards.`}
      />
    </>
  );
};

export default SetListItem;