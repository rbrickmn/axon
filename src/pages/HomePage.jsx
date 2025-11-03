import React from 'react';
import SetList from '../components/SetList/SetList';
import SetForm from '../components/SetForm/SetForm';

const HomePage = ({ sets, addSet, editSet, deleteSet, selectSet }) => {
  return (
    <div>
      <h1>Flashcard Sets</h1>
      <SetForm addSet={addSet} />
      <SetList
        sets={sets}
        editSet={editSet}
        deleteSet={deleteSet}
        selectSet={selectSet}
      />
    </div>
  );
};

export default HomePage;
