import React from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1 className="col-12 mt-3">404 Page Not Found</h1>
          <Link to='/' className="back-home col-12">
            <button className="btn btn-outline-dark">Back to Home</button>
          </Link>
        </div>
      </div>
    );
  }
}
