import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../../api";
import { useState, useEffect, Suspense, useRef } from "react";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const location = useLocation();
  const { movieId } = useParams();
  const backLink = useRef(location.state ?? "/movies");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
        setLoading(false);
      } catch {
        toast.error("Something went wrong. Please, try again!");
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  const { original_title, overview, genres, poster_path, vote_average } =
    movieDetails;
  const scoreToFixed = Number(vote_average).toFixed(2);

  return (
    <main>
      <div>
        <Link to={backLink.current}>
          <IoArrowBackCircleOutline />
          Go back
        </Link>
        {loading && <Loader />}
        <div>
          <img
            src={
              poster_path ? (
                `https://image.tmdb.org/t/p/w500${poster_path}`
              ) : (
                <p>No image</p>
              )
            }
            loading="lazy"
            alt={original_title}
          />
          <div>
            <h1>{original_title}</h1>
            <p>User score: {scoreToFixed}</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <ul>
              {genres &&
                genres.length &&
                genres.map(({ id, name }) => <li key={id}>{name}</li>)}
            </ul>
          </div>
        </div>
        <div>
          <h3>Additional information</h3>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}
