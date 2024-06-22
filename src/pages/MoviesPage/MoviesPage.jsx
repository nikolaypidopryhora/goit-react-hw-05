import { useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieByKeyword } from "../../api";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("movieName") ?? "";
  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMoviesList([]);
    setLoading(true);
    const getMovieByKeyword = async (movieName) => {
      try {
        const data = await fetchMovieByKeyword(movieName);
        setError(false);
        setMoviesList(data);
        setLoading(false);
      } catch {
        setLoading(false);
        toast.error("Something went wrong. Please, try again!");
      }
    };
    getMovieByKeyword(movieName);
  }, [movieName]);

  const handleSubmit = (value) => {
    setSearchParams({ movieName: value });
  };

  return (
    <main>
      <div>
        <SearchBar onSearch={handleSubmit} />
        {error && (
          <p>There is no movies with this request. Please, try again</p>
        )}
        <MovieList movies={moviesList} />
        {loading && <Loader />}
      </div>
    </main>
  );
}
