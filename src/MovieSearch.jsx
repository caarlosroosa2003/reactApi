import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "a7777904";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [movies, setMovies] = useState([]);
  const [lastQuery, setLastQuery] = useState("");

  const fetchMovies = async () => {
    if (query.trim() === "" || query === lastQuery) return;

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}${
      year ? `&y=${year}` : ""
    }${type ? `&type=${type}` : ""}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
      setLastQuery(query);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">🎬 WikiPelis</h1>

      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar película..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="movie">Película</option>
            <option value="series">Serie</option>
            <option value="game">Juego</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={fetchMovies}>
            Buscar
          </button>
        </div>
      </div>

      <div className="row">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="col-md-3 mb-4">
              <div className="card h-100 shadow-lg">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={movie.Title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text text-muted">{movie.Year}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
