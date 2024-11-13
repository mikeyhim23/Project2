import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import SearchBar from './SearchBar'; 

function App() {
  const [characters, setCharacters] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    description: '',
    anime: '',
    image: '', 
  })

  const fetchCharacters = () => {
    setLoading(true)
    fetch('http://localhost:3000/characters') 
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data)
        setFilteredCharacters(data)
        setError('')
      })
      .catch((err) => {
        setError('Cannot fetch character data.')
      })
      .then(() => {
        setLoading(false)
      })
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === '') {
      setError('Enter character name.')
      setFilteredCharacters(characters)
    } else {
      const searchResults = characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (searchResults.length > 0) {
        setFilteredCharacters(searchResults)
        setError('')
      } else {
        setError('No characters found.')
        setFilteredCharacters([])
      }
    }
  };

  const handleDeleteCharacter = (id) => {
    fetch(`http://localhost:3000/characters/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'app/json',
      },
    })
      .then((res) => res.json()) 
      .then(() => {
        setCharacters((oldCharacters) =>
          oldCharacters.filter((character) => character.id !== id)
        )
      })
      .catch((err) => {
        setError('Cannot delete.')
      })
  }

  const handleEditCharacter = (id, updatedData) => {
    fetch(`http://localhost:3000/characters/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'app/json', 
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
        setError('Cannot update.')
      })
  }

  const handleAddCharacter = () => {
    if (!newCharacter.name || !newCharacter.description || !newCharacter.anime) {
      setError('Fill in all fields.');
      return;
    }

    fetch('http://localhost:3000/characters', {
      method: 'POST', 
      headers: {
        'Content-Type': 'app/json',
      },
      body: JSON.stringify(newCharacter), 
    })
      .then((res) => res.json()) 
      .then((createdCharacter) => {
        setCharacters((oldCharacters) => [...oldCharacters, createdCharacter])
        setNewCharacter({ name: '', description: '', anime: '', image: '' })
        setError(''); 
      })
      .catch((err) => {
        setError('Cannot to add character.')
      })
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <div className="App">
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
            <p>null</p>
          )}
        </div>
      )}

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

export default App;
