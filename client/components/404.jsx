import React from 'react';
import { Link } from 'react-router';

export default class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>404 Page Not Found</h1>
        <Link to="/">
          <h4>Back to Home</h4>
        </Link>
      </div>
    );
  }
}
