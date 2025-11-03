import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import SetView from './pages/SetView';
import AppShell from './components/layout/AppShell';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';

function App() {
  const [sets, setSets] = useState([
    {
      id: 1,
      name: 'React Basics',
      description: 'Fundamental concepts of React.',
      flashcards: [
        {
          id: 101,
          question: 'What is React?',
          answer: 'A JavaScript library for building user interfaces.',
        },
        {
          id: 102,
          question: 'What is JSX?',
          answer: 'A syntax extension for JavaScript.',
        },
      ],
    },
  ]);
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [isBatchImporting, setIsBatchImporting] = useState(false);

  const addSet = (name, description) => {
    setSets([
      ...sets,
      { id: Date.now(), name, description, flashcards: [] },
    ]);
  };

  const editSet = (setId, newName, newDescription) => {
    setSets(
      sets.map((set) =>
        set.id === setId
          ? { ...set, name: newName, description: newDescription }
          : set
      )
    );
  };

  const deleteSet = (setId) => {
    setSets(sets.filter((set) => set.id !== setId));
    if (selectedSetId === setId) {
      setSelectedSetId(null);
    }
  };

  const selectSet = (setId) => {
    setSelectedSetId(setId);
  };

  const deselectSet = () => {
    setSelectedSetId(null);
  };

  const addFlashcard = (setId, flashcard) => {
    setSets(
      sets.map((set) =>
        set.id === setId
          ? { ...set, flashcards: [...set.flashcards, { ...flashcard, id: Date.now() }] }
          : set
      )
    );
  };

  const addMultipleFlashcards = (setId, newFlashcards) => {
    setSets(
      sets.map((set) =>
        set.id === setId
          ? {
              ...set,
              flashcards: [
                ...set.flashcards,
                ...newFlashcards.map((flashcard) => ({
                  ...flashcard,
                  id: Date.now() + Math.random(),
                })),
              ],
            }
          : set
      )
    );
  };

  const deleteFlashcard = (setId, flashcardId) => {
    setSets(
      sets.map((set) =>
        set.id === setId
          ? {
              ...set,
              flashcards: set.flashcards.filter(
                (flashcard) => flashcard.id !== flashcardId
              ),
            }
          : set
      )
    );
  };

  const editFlashcard = (setId, flashcardId, updatedFlashcard) => {
    setSets(
      sets.map((set) =>
        set.id === setId
          ? {
              ...set,
              flashcards: set.flashcards.map((flashcard) =>
                flashcard.id === flashcardId
                  ? { ...flashcard, ...updatedFlashcard }
                  : flashcard
              ),
            }
          : set
      )
    );
  };

  const enterStudyMode = () => {
    setIsStudyMode(true);
  };

  const exitStudyMode = () => {
    setIsStudyMode(false);
  };

  const toggleBatchImport = () => {
    setIsBatchImporting(!isBatchImporting);
  };

  const selectedSet = sets.find((set) => set.id === selectedSetId);

  return (
    <AppShell>
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <MainContent>
          {selectedSetId ? (
            <SetView
              set={selectedSet}
              deselectSet={deselectSet}
              addFlashcard={addFlashcard}
              addMultipleFlashcards={addMultipleFlashcards}
              deleteFlashcard={deleteFlashcard}
              editFlashcard={editFlashcard}
              isStudyMode={isStudyMode}
              enterStudyMode={enterStudyMode}
              exitStudyMode={exitStudyMode}
              isBatchImporting={isBatchImporting}
              toggleBatchImport={toggleBatchImport}
            />
          ) : (
            <HomePage
              sets={sets}
              addSet={addSet}
              editSet={editSet}
              deleteSet={deleteSet}
              selectSet={selectSet}
            />
          )}
        </MainContent>
      </div>
    </AppShell>
  );
}

export default App;