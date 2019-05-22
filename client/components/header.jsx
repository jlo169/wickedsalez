import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">WICKED SALEZ</a>
        <div className="shoppingCart mr-5">
          <div className="text-white"><i className="fas fa-shopping-cart"></i></div>
        </div>
      </nav>
    );
  }
}
