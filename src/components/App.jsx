import React, { useState, useEffect, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import LoggedOutRoute from "./LoggedOutRoute/LoggedOutRoute";
import Header from "./Header/Header";
import Register from "./Register/Register";
import Login from "./Login/Login";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getPokemonList, getPokemonDetails } from "../utils/api.js";
import { auth } from "../utils/auth.js";
import Main from "./Main";
import Preloader from "./Preloader/Preloader";
import InfoTooltip from "./InfoTooltip";
import "../index.css";
import Popup from "./Popup/Popup";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [popup, setPopup] = useState(null);
  const [isLoggedIn, setLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function initializeApp(token) {
    try {
      const user = await auth.checkToken(token);
      setCurrentUser(user);
      setLoggedin(true);
    } catch (err) {
      // console.error("Error al inicializar la aplicación:", err);
      setLoggedin(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      initializeApp(token);
    } else {
      setLoggedin(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      getPokemonList()
        .then((initialData) => {
          const pokemonPromises = initialData.results.map((p) =>
            getPokemonDetails(p.url)
          );
          return Promise.all(pokemonPromises);
        })
        .then((detailedData) => {
          const allPokemonTypes = [
            ...new Set(
              detailedData.flatMap((p) => p.types.map((t) => t.type.name))
            ),
          ];
          setAllTypes(allPokemonTypes.sort());

          const pokemonWithFavorites = detailedData.map((p) => ({
            ...p,
            isFavorite: false,
          }));
          setPokemonList(pokemonWithFavorites);
        })
        .catch((err) => {
          // console.error("Failed to fetch Pokémon details:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedin(false);
    setCurrentUser(null);
    navigate("/signin", { replace: true });
  };

  const handleToggleFavorite = (pokemonId) => {
    const updatedList = pokemonList.map((p) => {
      if (p.id === pokemonId) {
        return { ...p, isFavorite: !p.isFavorite };
      }
      return p;
    });
    setPokemonList(updatedList);
  };

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const filteredPokemon = useMemo(() => {
    if (selectedType === "all") {
      return pokemonList;
    }
    return pokemonList.filter((p) =>
      p.types.some((t) => t.type.name === selectedType)
    );
  }, [pokemonList, selectedType]);

  async function handleUserSignup(data) {
    setIsLoading(true);
    await auth
      .signup(data)
      .then((userInfo) => {
        if (userInfo) {
          const infoTooltipTrue = {
            children: <InfoTooltip registerStatus={true} />,
          };
          setPopup(infoTooltipTrue);
          navigate("/signin");
        }
      })
      .catch((err) => {
        if (err) {
          const infoTooltipFalse = {
            children: <InfoTooltip registerStatus={false} />,
          };
          setPopup(infoTooltipFalse);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleUserSignin(credentials) {
    setIsLoading(true);
    try {
      const { token } = await auth.signIn(credentials);
      localStorage.setItem("jwt", token);

      await initializeApp(token);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 300);

      setPopup({
        title: "",
        children: <InfoTooltip registerStatus={true} />,
      });
    } catch (err) {
      // console.error("Error en login:", err);
      setPopup({
        title: "",
        children: <InfoTooltip registerStatus={false} />,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <div className="page__content">
      {isLoggedIn ? (
        <Header
          isLoggedIn={isLoggedIn}
          allTypes={allTypes}
          selectedType={selectedType}
          onSelectType={handleSelectType}
          onLogout={handleLogout}
          // userEmail={currentUser?.email}
        />
      ) : null}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CurrentUserContext.Provider
                value={{
                  currentUser,
                  setCurrentUser,
                  // handleUpdateUser,
                  // handleUpdateAvatar,
                  // handleAddPlaceSubmit,
                }}
              >
                {isLoading ? (
                  <Preloader />
                ) : (
                  <Main
                    pokemonList={filteredPokemon}
                    onToggleFavorite={handleToggleFavorite}
                  />
                )}
                {/* <Footer /> */}
              </CurrentUserContext.Provider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <LoggedOutRoute isLoggedIn={isLoggedIn}>
              <Register
                onRegister={handleUserSignup}
                popup={popup}
                onClosePopup={handleClosePopup}
              />
            </LoggedOutRoute>
          }
        />

        <Route
          path="/signin"
          element={
            <LoggedOutRoute isLoggedIn={isLoggedIn}>
              <Login
                onLogin={handleUserSignin}
                popup={popup}
                onClosePopup={handleClosePopup}
              />
            </LoggedOutRoute>
          }
        />
      </Routes>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </div>
  );
}
export default App;
