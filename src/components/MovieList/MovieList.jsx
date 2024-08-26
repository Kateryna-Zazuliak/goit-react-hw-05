import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} className={css.link}>
          <Link
            state={{ from: location }}
            to={isHomePage ? `/movies/${movie.id}` : `${movie.id}`}
          >
            <h3 className={css.title}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
