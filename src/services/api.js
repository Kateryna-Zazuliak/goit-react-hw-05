import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.API_KEY = "f6c576276c404d93cb84e7d8fa261912";
axios.defaults.headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmM1NzYyNzZjNDA0ZDkzY2I4NGU3ZDhmYTI2MTkxMiIsIm5iZiI6MTcyNDMzNjU2OC4yMjgxOTksInN1YiI6IjY2YzUyOGZiMjhlMGFjODc5ZmQxOTBhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W8vkgWgh2kdCAE-WBrhr8IJM28lgiQ_14rz6wVDUKF4",
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(`/trending/movie/day`);
  return data.results;
};

export const fetchSearchMovie = async (query) => {
  const { data } = await axios.get("/search/movie", {
    params: {
      query,
    },
  });
  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}`);
  return data;
};
export const fetchMovieCredits = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data.cast;
};
export const fetchMovieReviews = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data.results;
};
