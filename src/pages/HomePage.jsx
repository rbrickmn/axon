import React from 'react';
import SetList from '../components/SetList/SetList';
import SetForm from '../components/SetForm/SetForm';
import { Dialog } from '../components/ui/Dialog';

const HomePage = ({
  sets,
  addSet,
  editSet,
  deleteSet,
  selectSet,
  isCreateSetModalOpen,
  closeCreateSetModal,
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Flashcard Sets</h1>
      <SetList
        sets={sets}
        editSet={editSet}
        deleteSet={deleteSet}
        selectSet={selectSet}
      />
      <Dialog open={isCreateSetModalOpen} onClose={closeCreateSetModal}>
        <SetForm addSet={addSet} />
      </Dialog>
    </div>
  );
};

export default HomePage;
