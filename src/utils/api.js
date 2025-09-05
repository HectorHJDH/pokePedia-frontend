const apiConfig = {
  baseUrl: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getPokemonList = (limit = 151, offset = 0) => {
  return fetch(`${apiConfig.baseUrl}/pokemon?limit=${limit}&offset=${offset}`, {
    headers: apiConfig.headers,
  }).then(handleResponse);
};

export const getPokemonDetails = (url) => {
  return fetch(url, {
    headers: apiConfig.headers,
  }).then(handleResponse);
};
