import React from 'react';
import { Link } from 'react-router-dom';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  sumOfAllPrices() {
    let priceTotal = 0;
    for (let item of this.props.itemsInCart) {
      priceTotal += (parseInt(item.price) * item.quantity);
    }
    const subtotal = '$' + ((priceTotal / 100).toFixed(2));
    return subtotal;
  }

  render() {
    const cartItems = this.props.itemsInCart.map(cartItem =>
      <CartSummaryItem
        cartItem={cartItem}
        key={cartItem.id}
        updateQty={this.props.updateQty}
        getCart={this.props.getCart}
      />
    );
    let subtotal = this.sumOfAllPrices();

    return (
      <div className="container">
        <div className="container mt-3">
          <div className="row">
            <div className="col-8">
              {this.props.itemsInCart.length ? cartItems : `Nothing in cart`}
            </div>
            <div className="col-4 border border-secondary rounded">
              <h3 className="">Item Subtotal: {subtotal}</h3>
              {this.props.itemsInCart.length
                ? <Link to={'/checkout'}>
                  <button
                    className="btn btn-secondary"
                  >
                  Checkout
                  </button>
                </Link>
                : <button className="btn btn-secondary" disabled>
                  Checkout
                </button>
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}
