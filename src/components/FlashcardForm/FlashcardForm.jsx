import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import AlertDialog from "../ui/AlertDialog";

const FlashcardForm = ({ addFlashcard }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
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

    // Add the flashcard to the list
    addFlashcard({ question: trimmedQuestion, answer: trimmedAnswer });

    // Clear the input fields
    setQuestion("");
    setAnswer("");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create a New Flashcard</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                type="text"
                placeholder="Enter question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Input
                id="answer"
                type="text"
                placeholder="Enter answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <Button type="submit">Add Flashcard</Button>
          </form>
        </CardContent>
      </Card>
      <AlertDialog
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Invalid Input"
        description="Please fill out all fields."
      />
    </>
  );
};

export default FlashcardForm;
