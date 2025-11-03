import React, { useState } from 'react';
import { parseFlashcards } from '../../utils/parseFlashcards';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import AlertDialog from '../ui/AlertDialog';

const BatchImportForm = ({ addMultipleFlashcards, toggleBatchImport }) => {
  const [text, setText] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFlashcards = parseFlashcards(text);
    if (newFlashcards.length > 0) {
      addMultipleFlashcards(newFlashcards);
      setAlertContent({
        title: 'Success',
        description: `${newFlashcards.length} flashcards created successfully!`,
      });
      setIsAlertOpen(true);
      setText('');
      toggleBatchImport();
    } else {
      setAlertContent({
        title: 'Error',
        description: 'Could not parse any flashcards. Please check the format of your text.',
      });
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Batch Import Flashcards</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batchImportText">Paste your text here</Label>
              <Textarea
                id="batchImportText"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here. Separate each flashcard with a new line."
                rows="10"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit">Create Flashcards</Button>
              <Button variant="outline" type="button" onClick={toggleBatchImport}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <AlertDialog
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title={alertContent.title}
        description={alertContent.description}
      />
    </>
  );
};

export default BatchImportForm;
