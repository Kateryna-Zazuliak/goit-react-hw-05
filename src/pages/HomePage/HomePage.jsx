import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../services/api";
import { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const showMoviesList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message || "Something went wrong! Please try again!");
      } finally {
        setIsLoading(false);
      }
    };
    showMoviesList();
  }, []);
  return (
    <section className={css.section}>
      {isLoading && <Loader />}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <div>
          <h2 className={css.title}>
            Trending today! <FaArrowTrendUp />
          </h2>
          <MovieList movies={movies} />
        </div>
      )}
    </section>
  );
};

export default HomePage;
