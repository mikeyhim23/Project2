import React, { useState } from 'react';

function AddCharacterForm({ onAddCharacter }) {
  // Local state to hold new character's details
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && imageUrl && description) {
      onAddCharacter({ name, imageUrl, description });  // Pass new character data to parent component
      setName('');  // Reset name field
      setImageUrl('');  // Reset image URL field
      setDescription('');  // Reset description field
    }
  };

  return (
    <div>
      <h2>Add a New Character</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Character Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}  // Update state on input change
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}  // Update state on input change
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}  // Update state on input change
            required
          />
        </div>
        <button type="submit">Add Character</button>
      </form>
    </div>
  );
}

export default AddCharacterForm;
