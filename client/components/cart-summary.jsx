import React from 'react';
import { Link } from 'react-router-dom';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  sumOfAllPrices() {
    let priceTotal = 0;
    for (let item of this.props.itemsInCart) {
      priceTotal += parseInt(item.price);
    }
    const averagePrice = '$' + ((priceTotal / 100).toFixed(2));
    return averagePrice;
  }

  checkoutButtonClicked(event) {
    event.preventDefault();
    this.props.setViewMethod('checkout', {});
  }

  render() {
    const cartItems = this.props.itemsInCart.map(cartItem =>
      <CartSummaryItem
        cartItem={cartItem}
        key={cartItem.id}
      />
    );
    let averagePrice = this.sumOfAllPrices();

    return (
      <div className="container">
        <div className="container mt-3">
          <div className="row">
            <div className="col-8">
              {cartItems}
            </div>
            <div className="col-4 border border-secondary rounded">
              <h3 className="">Item Total: {averagePrice}</h3>
              <Link to={'/checkout'}>
                <button
                  className="btn btn-secondary"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
