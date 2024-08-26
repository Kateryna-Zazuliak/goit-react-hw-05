import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../services/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [credit, setCredit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const showMovieCredits = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovieCredits(movieId);
        setCredit(data);
      } catch (error) {
        setError(error.message || "Something went wrong! Please try again!");
      } finally {
        setIsLoading(false);
      }
    };
    showMovieCredits();
  }, [movieId]);
  if (!movieId) return;
  return (
    <div className={css.cast}>
      {isLoading && <Loader />}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ul className={css.list}>
          {credit.map((cast) => (
            <li key={cast.id} className={css.item}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                    : "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster"
                }
                width={50}
                alt={cast.name}
              />
              <p className={css.name}>{cast.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
