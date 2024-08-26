import { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import GoBack from "../../components/GoBack/GoBack";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { toastStyles } from "../../services/toast";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";
import toast, { Toaster } from "react-hot-toast";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

  useEffect(() => {
    const showMovieDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError(error.message || "Something went wrong! Please try again!");
      } finally {
        setIsLoading(false);
      }
    };
    showMovieDetails();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!movieDetails) return null;
  const year = movieDetails.release_date
    ? movieDetails.release_date.split("-")[0]
    : "Unknown year";
  const userScore = movieDetails.vote_average
    ? Math.round(movieDetails.vote_average * 100) / 10
    : "N/A";
  return (
    <div className={css.details}>
      <GoBack />
      <div className={css.detailsMovie}>
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
              : defaultImg
          }
          width={250}
          alt="poster"
        />
        <ul className={css.list}>
          <li>
            <h2 className={css.titleTop}>
              {movieDetails.title} ({year})
            </h2>
            <p className={css.info}>
              User Score: {userScore}%, voutes {movieDetails.vote_count}
            </p>
          </li>
          <li>
            <h2 className={css.title}>Overview</h2>
            <p className={css.info}>{movieDetails.overview}</p>
          </li>
          <li>
            <h2 className={css.title}>Genres</h2>
            <p className={css.info}>
              {movieDetails.genres.map((genre) => genre.name).join(" ")}
            </p>
          </li>
          <li>
            <h2 className={css.title}>Country:</h2>
            <p className={css.info}>{movieDetails.origin_country}</p>
          </li>
        </ul>
      </div>
      <h2 className={css.secondTitle}>Additional information</h2>
      <div>
        <NavLink
          className={({ isActive }) =>
            clsx(css.link, isActive && css.linkActive)
          }
          to="cast"
        >
          Cast
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(css.link, isActive && css.linkActive)
          }
          to="reviews"
        >
          Reviews
        </NavLink>
      </div>
      <Outlet />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MovieDetailsPage;
