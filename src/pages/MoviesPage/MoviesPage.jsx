import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovie } from "../../services/api";
import { FiSearch } from "react-icons/fi";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";
import { toastStyles } from "../../services/toast";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const movieName = searchParams.get("query") ?? "";

  useEffect(() => {
    if (movieName === "") return;
    const showSearchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchSearchMovie(movieName);
        setMovies(data);
      } catch (error) {
        setError(error.message || "Something went wrong! Please try again!");
      } finally {
        setIsLoading(false);
      }
    };
    showSearchMovies();
  }, [movieName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements.searchInput.value.trim();
    if (query === "") {
      toast("Please enter search word.", toastStyles);
      return;
    }
    setSearchParams({ query: query });
    event.target.elements.searchInput.value = "";
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={css.btn} type="submit">
          <FiSearch />
        </button>
      </form>
      {isLoading && <Loader />}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        movies && movies.length > 0 && <MovieList movies={movies} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
