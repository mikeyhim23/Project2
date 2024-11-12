import { useState, useEffect } from 'react'
import CharacterCard from './CharacterCard'

function App() {
  const[character, setCharacter] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState()

  const searchCharacter = () => {
    setError()

    fetch(`https://api.jikan.moe/v4/characters?q=${searchQuery}`)
      .then(res => res.json())
      .then(info => {
        if (info.data && info.data.length > 0) {
          setCharacter(info.data[0])
        } else {
          setCharacter()
          setError('Character not found!')
        }
      })

      .catch(error => {
        setError(error.message || 'Failed to fetch.')
      })

  }

  return (
    <div className='App'>
      <h2>Anime Character Card</h2>
      <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search Character' />
      <button onClick={searchCharacter}>Search</button>
      {character && <CharacterCard character={character} />}
    </div>
  )
}

export default App
