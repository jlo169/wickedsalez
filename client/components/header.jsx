import React from 'react';

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
        <a className="navbar-brand text-white"
          onClick={event => this.mainTitleClicked(event)}
        >
          WICKED SALEZ
        </a>
        <div
          className="shoppingCart mr-5"
          onClick={ event => this.cartButtonClicked(event)}
        >
          <div className="text-white">
            {this.props.cartItems
              ? this.props.cartItems.length + ' Items '
              : ''
            }
            <i className="fas fa-shopping-cart ml-2"></i>
          </div>
        </div>
      </nav>
    );
  }
}
