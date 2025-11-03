import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import AlertDialog from '../ui/AlertDialog';

const EditSetForm = ({ set, editSet, setIsEditing }) => {
  const [name, setName] = useState(set.name);
  const [description, setDescription] = useState(set.description);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      editSet(set.id, name, description);
      setIsEditing(false);
    } else {
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="editSetName">Set Name</Label>
            <Input
              id="editSetName"
              type="text"
              placeholder="Enter set name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="editSetDescription">Description (optional)</Label>
            <Input
              id="editSetDescription"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="submit">Save</Button>
            <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
      <AlertDialog
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Invalid Input"
        description="Set name cannot be empty."
      />
    </>
  );
};

export default EditSetForm;
