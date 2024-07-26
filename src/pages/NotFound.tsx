import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import routes from '@/utils/routes';

const NotFound: FC = () => {
  return (
    <main className="not-found-page" lang="en">
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist."
        />
      </Helmet>
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">Page Not Found</p>
      <Link to={routes.startPage.url} className="not-found-home-link">
        Go back home
      </Link>
    </main>
  );
};

export default NotFound;
