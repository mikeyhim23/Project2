import React, { useState } from 'react';

function CharacterCard({ character, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [updatedDescription, setUpdatedDescription] = useState(character.description)
  const [updatedName, setUpdatedName] = useState(character.name)
  const [updatedAnime, setUpdatedAnime] = useState(character.anime)
  const [updatedImage, setUpdatedImage] = useState(character.image || '')

  const doEdit = () => {
    setEditing(!editing)
  }

  const handleSave = () => {
    const updatedData = {
      ...character,
      name: updatedName,
      description: updatedDescription,
      anime: updatedAnime,
      image: updatedImage,
    };
    onEdit(updatedData)
    doEdit()
  }

  return (
    <div className="character-card">
      <img
        src={updatedImage || 'default-image-url.jpg'}
        alt={updatedName || 'Unknown character'}
      />
      <h3>{updatedName || 'No name available'}</h3>

      {editing ? (
        <div>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Character Name"
          />
          <input
            type="text"
            value={updatedAnime}
            onChange={(e) => setUpdatedAnime(e.target.value)}
            placeholder="Anime"
          />
          <input
            type="text"
            value={updatedImage}
            onChange={(e) => setUpdatedImage(e.target.value)}
            placeholder="Image URL"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={doEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{character.description || 'No description'}</p>
          <p>Anime: {character.anime}</p>
        </div>
      )}

      <button onClick={() => onDelete(character.id)}>Delete</button>
      <button onClick={doEdit}>{editing ? 'Cancel Edit' : 'Edit'}</button>
    </div>
  );
}

export default CharacterCard;
