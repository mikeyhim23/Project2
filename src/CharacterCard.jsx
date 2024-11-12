import React from 'react';

function CharacterCard({ character }) {
  // If the character object is missing or not valid, return an error message
  if (!character) return <p>No character data available</p>;

  return (
    <div className="character-card">
      <img
        src={character.images?.jpg?.image_url || 'default-image-url.jpg'}  // Fallback image if missing
        alt={character.name || 'Unknown character'}
      />
      <h3>{character.name || 'No name available'}</h3>
      <p>{character.about || 'No description available'}</p>
    </div>
  );
}

export default CharacterCard;
