import React from "react";

function CharacterCard({ character}) {
    return (
        <div className="character-card">
            <img src={character.images.jpg.image_url} alt={character.name} />
            <h1>{character.name}</h1>
            <p>{character.about}</p>
        </div>
    )
}

export default CharacterCard