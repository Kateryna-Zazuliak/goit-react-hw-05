import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const showMovieReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(error.message || "Something went wrong! Please try again!");
      } finally {
        setIsLoading(false);
      }
    };
    showMovieReviews();
  }, [movieId]);

  if (!movieId) return;
  return reviews.length > 0 ? (
    <div className={css.review}>
      {isLoading && <Loader />}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className={css.item}>
              <img
                src={
                  review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`
                    : "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster"
                }
                width={50}
                alt={review.author}
              />
              <p className={css.title}>Author: {review.author}.</p>
              <p className={css.text}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <p>We don&apos;t have any reviews for this movie!</p>
  );
};

export default MovieReviews;
