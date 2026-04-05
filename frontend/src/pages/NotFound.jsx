import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__card">
        <p className="not-found__eyebrow">Error 404</p>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__text">
          The page you are looking for does not exist or was moved.
        </p>
        <div className="not-found__actions">
          <Link className="not-found__button" to="/">
            Go to Home
          </Link>
          <Link className="not-found__ghost" to="/dashboard">
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
