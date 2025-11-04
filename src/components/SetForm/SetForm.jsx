import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import AlertDialog from '../ui/AlertDialog';

const SetForm = ({ addSet }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addSet(name.trim(), description.trim());
      setName('');
      setDescription('');
    } else {
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create a New Set</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="setName">Set Name</Label>
              <Input
                id="setName"
                type="text"
                placeholder="Enter set name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="setDescription">Description (optional)</Label>
              <Input
                id="setDescription"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button type="submit">Add Set</Button>
          </form>
        </CardContent>
      </Card>
      <AlertDialog
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Invalid Input"
        description="Set name cannot be empty."
      />
    </>
  );
};

export default SetForm;
