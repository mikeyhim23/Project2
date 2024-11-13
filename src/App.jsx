import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import SearchBar from './SearchBar';
import AddCharacter from './AddCharacter'; // New component for adding characters

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    description: '',
    anime: '',
    image: '',
  });

  const [showHome, setShowHome] = useState(true); // This state determines whether to show the Home section or Add Character section

  // Fetch characters from the server
  const fetchCharacters = () => {
    setLoading(true);
    fetch('http://localhost:3000/characters')
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setFilteredCharacters(data);
        setError('');
      })
      .catch((err) => {
        setError('Cannot fetch character data.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submit
  const handleSearchSubmit = () => {
    if (searchQuery.trim() === '') {
      setError('Enter character name.');
      setFilteredCharacters(characters);
    } else {
      const searchResults = characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (searchResults.length > 0) {
        setFilteredCharacters(searchResults);
        setError('');
      } else {
        setError('No characters found.');
        setFilteredCharacters([]);
      }
    }
  };

  // Handle delete character
  const handleDeleteCharacter = (id) => {
    fetch(`http://localhost:3000/characters/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setCharacters((oldCharacters) =>
          oldCharacters.filter((character) => character.id !== id)
        );
      })
      .catch((err) => {
        setError('Cannot delete.');
      });
  };

  // Handle edit character
  const handleEditCharacter = (id, updatedData) => {
    fetch(`http://localhost:3000/characters/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updatedCharacter) => {
        setCharacters((oldCharacters) =>
          oldCharacters.map((character) =>
            character.id === id ? updatedCharacter : character
          )
        );
      })
      .catch((err) => {
        setError('Cannot update.');
      });
  };

  // Handle add new character
  const handleAddCharacter = () => {
    if (!newCharacter.name || !newCharacter.description || !newCharacter.anime) {
      setError('Fill in all fields.');
      return;
    }

    fetch('http://localhost:3000/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCharacter),
    })
      .then((res) => res.json())
      .then((createdCharacter) => {
        setCharacters((oldCharacters) => [...oldCharacters, createdCharacter]);
        setNewCharacter({ name: '', description: '', anime: '', image: '' });
        setError('');
      })
      .catch((err) => {
        setError('Cannot add character.');
      });
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="App">
      <header>
        <button onClick={() => setShowHome(true)}>Home</button>
        <button onClick={() => setShowHome(false)}>Add Character</button>
      </header>

      {showHome ? (
        <div>
          <h2>Search for Anime Characters</h2>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />

          {error && <p className="error">{error}</p>}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="character-list">
              {filteredCharacters.length > 0 ? (
                filteredCharacters.map((character) => (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    onDelete={() => handleDeleteCharacter(character.id)}
                    onEdit={(updatedData) => handleEditCharacter(character.id, updatedData)}
                  />
                ))
              ) : (
                <p>No characters found</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <AddCharacter
          newCharacter={newCharacter}
          setNewCharacter={setNewCharacter}
          handleAddCharacter={handleAddCharacter}
          setError={setError}
        />
      )}
    </div>
  );
}

export default App;
