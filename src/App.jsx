import { useState, useEffect } from 'react'
import CharacterCard from './CharacterCard'

function App() {
  const[character, setCharacter] = useState()

  useEffect(() => {
    const fetchCharacter = async () => {
      const res = await fetch('https://api.jikan.moe/v4characters/1')
      const info = await res.json()
      setCharacter(info.data)
    }

    fetchCharacter()
  }, [])

  return (
    <div className='App'>
      <h2>Anime Character Card</h2>
      {character && <CharacterCard character={character} />}
    </div>
  )
}

export default App
