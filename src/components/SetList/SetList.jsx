import React from 'react';
import SetListItem from '../SetListItem/SetListItem';

const SetList = ({ sets, editSet, deleteSet, selectSet }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
