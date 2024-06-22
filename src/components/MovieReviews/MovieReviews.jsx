import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

export default function MovieReviews() {
  const [reviewsList, setReviewsList] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    const getMovieReviews = async (movieId) => {
      try {
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setReviewsList(data);
      } catch {
        setError(true);
        toast.error("Something went wrong. Please, try again!");
      }
    };
    getMovieReviews(movieId);
  }, [movieId]);

  return (
    <main>
      {!error ? (
        <ul>
          {reviewsList.length > 0 ? (
            reviewsList.map(({ author, content, id }) => (
              <li key={id}>
                <p>
                  <FaUserCircle />
                  {author}
                </p>
                <p>{content}</p>
              </li>
            ))
          ) : (
            <p>No reviews for this movie yet.</p>
          )}
        </ul>
      ) : (
        <p>Something went wrong!</p>
      )}
    </main>
  );
}
