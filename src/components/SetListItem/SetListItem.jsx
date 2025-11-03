import React, { useState } from 'react';
import EditSetForm from '../EditSetForm/EditSetForm';
import { Button } from '../ui/Button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import ConfirmationDialog from '../ui/ConfirmationDialog';

const SetListItem = ({ set, editSet, deleteSet, selectSet }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDelete = () => {
    deleteSet(set.id);
    setIsConfirmingDelete(false);
  };

  return (
    <>
      <Card>
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
              <Button variant="outline" onClick={() => selectSet(set.id)}>View</Button>
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
        description={`This will permanently delete the "${set.name}" set and all its flashcards.`}
      />
    </>
  );
};

export default SetListItem;
