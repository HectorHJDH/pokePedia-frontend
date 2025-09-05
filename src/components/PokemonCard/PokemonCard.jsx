import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon, onToggleFavorite }) => {
  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;
  const name = pokemon.name;
  const types = pokemon.types.map((typeInfo) => typeInfo.type.name);
  const pokedexNumber = `#${String(pokemon.id).padStart(3, "0")}`;

  return (
    <div className="pokemon-card">
      <button
        className={`pokemon-card__favorite-btn ${
          pokemon.isFavorite ? "pokemon-card__favorite-btn--active" : ""
        }`}
        onClick={() => onToggleFavorite(pokemon.id)}
      >
        {pokemon.isFavorite ? "★" : "☆"}
      </button>
      <span className="pokemon-card__number">{pokedexNumber}</span>
      <img src={imageUrl} alt={name} className="pokemon-card__image" />
      <h2 className="pokemon-card__name">{name}</h2>
      <div className="pokemon-card__types">
        {types.map((type) => (
          <span
            key={type}
            className={`pokemon-card__type pokemon-card__type--${type}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
