import React from "react";

const CharacterCard = ({ character }) =>  {
    return (
        <div className="character-card">
            <img src={character.image_url} alt={character.name} />
            <h1>{character.name}</h1>
            <p>{character.about}</p>
        </div>
    )
}

export default CharacterCard