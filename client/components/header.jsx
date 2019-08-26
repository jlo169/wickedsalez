import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    let totalItemsInCart = 0;

    for (let cartItem of this.props.cartItems) {
      totalItemsInCart += parseInt(cartItem.quantity);
    }

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
                ? totalItemsInCart + ' Items '
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
