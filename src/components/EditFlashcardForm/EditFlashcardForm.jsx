import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import AlertDialog from '../ui/AlertDialog';

const EditFlashcardForm = ({ flashcard, editFlashcard, setIsEditing }) => {
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim any whitespace from the input fields
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    // If either field is empty, show an alert and return
    if (!trimmedQuestion || !trimmedAnswer) {
      setIsAlertOpen(true);
      return;
    }

    // Edit the flashcard
    editFlashcard(flashcard.id, { question: trimmedQuestion, answer: trimmedAnswer });

    // Close the edit form
    setIsEditing(false);
  };

  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="editQuestion">Question</Label>
            <Input
              id="editQuestion"
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="editAnswer">Answer</Label>
            <Input
              id="editAnswer"
              type="text"
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
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
        description="Please fill out all fields."
      />
    </>
  );
};

export default EditFlashcardForm;
