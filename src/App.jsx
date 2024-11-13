import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import SearchBar from './SearchBar';
import AddCharacter from './AddCharacter';

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

  const [home, setHome] = useState(true)

  const fetchCharacters = () => {
    setLoading(true);
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
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim() === '') {
      setError('Enter character name.')
      setFilteredCharacters(characters)
    } else {
      const searchResults = characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (searchResults.length > 0) {
        setFilteredCharacters(searchResults);
        setError('');
      } else {
        setError('No characters found.');
        setFilteredCharacters([]);
      }
    }
  }

  const back = () => {
    setSearchQuery('')
    setFilteredCharacters(characters)
  }

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
        )
        setFilteredCharacters((oldCharacters) =>
          oldCharacters.filter((character) => character.id !== id)
        )
      })
      .catch((err) => {
        setError('Cannot delete.');
      })
  }

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
        )
        setFilteredCharacters((oldCharacters) =>
          oldCharacters.map((character) =>
            character.id === id ? updatedCharacter : character
          )
        )
      })
      .catch((err) => {
        setError('Cannot update.')
      })
  }

  const handleAddCharacter = () => {
    if (!newCharacter.name || !newCharacter.description || !newCharacter.anime) {
      setError('Fill in all fields.')
      return
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
        setCharacters((oldCharacters) => [...oldCharacters, createdCharacter])
        setFilteredCharacters((oldCharacters) => [...oldCharacters, createdCharacter])
        setNewCharacter({ name: '', description: '', anime: '', image: '' })
        setError('')
      })
      .catch((err) => {
        setError('Cannot add character.')
      })
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <div className="App">
      <header>
        <button onClick={() => setHome(true)}>Home</button>
        <button onClick={() => setHome(false)}>Add Character</button>
      </header>

      {home ? (
        <div>
          <h2>Search Characters</h2>

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />
          <button onClick={back}>Back</button>

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
