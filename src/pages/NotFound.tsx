import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC = () => {
  return (
    <div className="not-found">
      <p className="p-404">404</p>
      <p>Page Not Found</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
