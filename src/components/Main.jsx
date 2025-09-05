import React from "react";
import PokemonCard from "./PokemonCard/PokemonCard";
import "../blocks/main.css";

const Main = ({ pokemonList, onToggleFavorite }) => {
  return (
    <main>
      <div className="main-content">
        {pokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
