import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import AddCharacterForm from './AddCharacterForm';

function App() {
  const [characters, setCharacters] = useState([]);  // Store character data
  const [searchQuery, setSearchQuery] = useState('');  // Store search input
  const [error, setError] = useState('');  // Store error messages

  const searchCharacter = () => {
    if (!searchQuery) {
      setError('Please enter a character name.');
      setCharacters([]);  // Clear previous characters
      return;
    }

    setError('');  // Clear any existing errors
    setCharacters([]);  // Clear previous search results

    fetch(`https://api.jikan.moe/v4/characters?q=${searchQuery}`)
      .then((res) => res.json())  // Convert response to JSON
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setCharacters(data.data);  // Set characters if found
        } else {
          setError('No characters found for this search.');
        }
      })
      .catch((err) => {
        setError('Failed to fetch character data.');  // Handle fetch error
      });
  };

  const addCharacter = (newCharacter) => {
    const newCharacterData = {
      name: newCharacter.name,
      images: { jpg: { image_url: newCharacter.imageUrl } },
      about: newCharacter.description
    };

    // Add the new character to the state
    setCharacters([...characters, newCharacterData]);
  };

  return (
    <div className="App">
      <h2>Search Characters</h2>
      
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  // Update search input
        placeholder="Enter character name"
      />
      
      <button onClick={searchCharacter}>Search</button>

      {error && <p className="error">{error}</p>}  {/* Show error message */}

      <div className="character-list">
        {characters.length > 0 ? (
          characters.map((character, index) => (
            <CharacterCard key={index} character={character} />
          ))
        ) : (
          <p>No characters to display</p>
        )}
      </div>

      <AddCharacterForm onAddCharacter={addCharacter} />
    </div>
  );
}

export default App;
