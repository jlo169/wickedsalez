import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  mainTitleClicked(event) {
    event.preventDefault(event);
    this.props.setViewMethod('catalog', {});
  }

  cartButtonClicked(event) {
    event.preventDefault();
    this.props.setViewMethod('cart', {});
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="navbar-brand">
          <Link to='/' className="font-weight-light">
            {this.props.title}
          </Link>
        </div>
        <div className="shoppingCart">
          <div className="text-white">
            <Link to='/cart'>
              {this.props.cartItems
                ? this.props.cartItems.length + ' Items '
                : ''
              }
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
