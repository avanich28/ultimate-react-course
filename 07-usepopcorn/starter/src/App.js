import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "83e64d8b";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Store message and display in UI
  const [selectedId, setSelectedId] = useState(null);

  // Topic: Selecting a Movie 🍖
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  // Topic: Adding a Watched Movie 🥸
  function handleAddWatched(movie) {
    // console.log(movie, "🥸");
    // console.log(watched);

    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // Topic: Synchronizing Queries With Movie Data 🦊
  /*
  useEffect(function () {
    console.log("After initial render");
  }, []);

  useEffect(function () {
    console.log("After every render");
  }); // If no dependency, sync with everything.

  useEffect(
    function () {
      console.log("D");
    },
    [query]
  );

  console.log("During render");
  */

  // if (!isLoading && movies.length) console.log("BATCHING");
  // else if (!isLoading) console.log("FIRST RE-RENDER");
  // if (isLoading) console.log("SECOND");

  // Topic: useEffect to the Rescue
  // The idea of useEffect hook is to give us a place where we can safely write side effects (like data fetching)
  // The side effect registered with the useEffect hook will only be executed after certain renders. For example, only write after the initial render.

  // Topic: Using as async Function
  // useEffect cannot return promise, so we need to wrap async function
  // (Can convert to event handler function)
  useEffect(
    function () {
      // Topic: Cleaning Up Data Fetching 💦
      // In network(Fetch/XHR) -> fetch are racing -> slower progress
      // Use abort controller (browser API)
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          // Topic: Adding a Loading State 🐶
          setIsLoading(true);
          setError(""); // Don't forget to reset

          const res = await fetch(
            // 🦊
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            // 💦
            { signal: controller.signal }
          );

          // Topic: Handling Errors
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          // console.log(movies); // [] bcs setting state is a asynchronous, so it is stale state
          // console.log(data.Search); // React reload 2 times bcs its strict mode.
          setError(""); // ?
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      // 🦊
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleCloseMovie(); // Close movie detail when have new search
      fetchMovies();

      // 💦 Each time that there is a new keystroke, so a new re-render, our controller will abort the current fetch request.
      return function () {
        controller.abort();
      };
    },
    // 🦊 Effect sync with query
    [query]
  ); // (func, dependency array)
  // [] means that the effect that we just specified will only run as the component first mount or it only run when the App() component renders for the very first time/first load. -> no more infinite loop

  // Topic: How NOT to Fetch Data in React
  // Side effect in render logic (interaction with the outside world which should not be allowed in render logic 🔥)
  // IMPT At the top level of function is code that will run as the component first mount and therefore it is called render logic, so we should not have side effect.
  /*
  fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => console.log(data.Search)); // Don't update state here!
  */

  // BUG Setting the state in render logic will immediately cause the component to re-render itself again. That is just how stat work.
  // 🔥 Component re-render -> function execute again -> (fetch again) -> setMovie again -> the whole thing start over again -> infinite loop
  // setWatched([]); // Error: To many re-render

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* <Box element={<MovieList movies={movies} />}></Box>
        <Box
          element={
            // Pass elements instead of children prop
            // Pass in a brand new piece of JSX -> So, we need a fragment 
            // -> In case you need to pass in multiple elements and give them separate names
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        ></Box> */}
        {/* 🐶 */}
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

/*
// Stateful Component
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/

// 🍖
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

// 🍖
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

// 🍖
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  // Topic: Loading Movie Details
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // Initial render component-> movie obj ={} -> title = undefined
  // After movie arrives from the API -> Component re-render -> 'Inception'
  console.log(title); // 🌸

  // 🥸
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  console.log("test");

  // Topic: One More Effect: Listening to a Keypress
  // Initial execute -> add event listener keydown in document -> press Esc -> execute callback func -> remove add event listener -> onCloseMovie() change -> execute useEffect func -> add event listener
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          console.log("CLOSING");
        }
      }
      // BUG Still listen when we press the key
      // We want to only attach this event listener to the document whenever we actually have the movie details in our tree. So, whenever that component instance is actually mounted. -> Move from App to MovieDetail
      document.addEventListener("keydown", callback);
      // BUG Each time that a new MovieDetails component mounts a new event listener is added to the document!

      // Need to clean up addEventListener
      // MovieDetails unmount -> The event listener will be removed from the document. -> Avoid having so many event listener in our DOM -> memory problem
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie] // Must include!
  );

  // No need to clean up this HTTP request bcs we don't click as fast as typing
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  // Topic: Adding a New Effect: Changing Page Title 🌸
  useEffect(
    function () {
      console.log(title);
      // if (!title) return;
      document.title = `Movie | ${title}`;

      // Topic: Cleaning Up the Title
      // Cleanup function returns from the effect.
      // 1. unmount component -> cleanup -> cleanup function get executed.
      return function () {
        document.title = "usePopcorn";
        // IMPT Still remember old title -> a closure (JS) -> a function will always remember all the variables that were present at the time and the place that function was created even after the component has already unmounted. 😛

        // 2. Also clean after the re-render
        // clean previous movie
        console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating} // External Rating
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

// Topic: A first Look at Effects
// In slide

// Topic: The UseEffect dependency array
// In slide

// Topic: The useEffect Cleanup Function
// In slide
