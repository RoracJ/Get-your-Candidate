import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404: Page Not Found</h1>
      <h1>¯\_(ツ)_/¯</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>
        Go back to Home
      </Link>
    </section>
  );
};

export default ErrorPage;
