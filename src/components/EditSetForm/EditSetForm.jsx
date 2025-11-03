import React, { useState } from 'react';

const EditSetForm = ({ set, editSet, setIsEditing }) => {
  const [name, setName] = useState(set.name);
  const [description, setDescription] = useState(set.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      editSet(set.id, name, description);
      setIsEditing(false);
    } else {
      alert('Set name cannot be empty.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Set Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );
};

export default EditSetForm;
