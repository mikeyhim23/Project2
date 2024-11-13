import React from 'react';

function AddCharacter({ newCharacter, setNewCharacter, handleAddCharacter, setError }) {
  return (
    <div>
      <h3>Add a New Character</h3>
      <input
        type="text"
        placeholder="Name"
        value={newCharacter.name}
        onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newCharacter.description}
        onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Anime"
        value={newCharacter.anime}
        onChange={(e) => setNewCharacter({ ...newCharacter, anime: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={newCharacter.image}
        onChange={(e) => setNewCharacter({ ...newCharacter, image: e.target.value })}
      />
      <button onClick={handleAddCharacter}>Add Character</button>
    </div>
  );
}

export default AddCharacter;
