import React from 'react';
import SetListItem from '../SetListItem/SetListItem';

const SetList = ({ sets, editSet, deleteSet, selectSet }) => {
  return (
    <div>
      {sets.map((set) => (
        <SetListItem
          key={set.id}
          set={set}
          editSet={editSet}
          deleteSet={deleteSet}
          selectSet={selectSet}
        />
      ))}
    </div>
  );
};

export default SetList;
