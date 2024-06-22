import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul>
      {movies.map((item) => {
        return (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`} state={location}>
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
