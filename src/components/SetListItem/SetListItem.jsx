import React, { useState } from 'react';
import EditSetForm from '../EditSetForm/EditSetForm';

const SetListItem = ({ set, editSet, deleteSet, selectSet }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <EditSetForm
          set={set}
          editSet={editSet}
          setIsEditing={setIsEditing}
        />
      ) : (
        <>
          <h3>{set.name}</h3>
          <p>{set.description}</p>
          <button onClick={() => selectSet(set.id)}>View</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteSet(set.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default SetListItem;
