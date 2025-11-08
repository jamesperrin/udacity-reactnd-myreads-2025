import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="not-found-page">
      <h1>404 - Page Not Found</h1>

      <p>The page you requested does not exist.</p>

      <Link to="/" title="Go back home">
        Go back home
      </Link>
    </section>
  );
}
