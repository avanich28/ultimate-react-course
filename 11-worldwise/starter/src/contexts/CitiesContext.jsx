import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// Topic: Back to "WorldWise": Creating a CitiesContext 🌈
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

// Topic: Advanced State Management System: Context + useReducer ⛩
// NOTE If we aren't dealing with async data, it is better to pass the dispatch function (in value={}) and create action inside the component!
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    // Convention name with '/'
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload, // Green outline
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}, // Get rid of green outline
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  // ⛩
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Topic: Implementing the Cities List (2)
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // Topic: Finishing the City View 🍁 (1)
  // Global state - Multiple component needs this state.
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
      // } finally {
      //   setIsLoading(false);
      // }
    }
    fetchCities();
  }, []);

  // 🍁
  async function getCity(id) {
    // Don't need to call API again
    // id from url will be string
    // console.log(id, currentCity.id)
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city...",
      });
    }
  }

  // Topic: Creating a New City (2) 😇
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        // Send some data to an API (in cities.json file)
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
    }
  }

  // Topic: Deleting a City (2) ❌
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Topic: Consuming the CitiesContext
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
