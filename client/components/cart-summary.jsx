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
      <div>
        <div className="container-fluid mt-2">
          {this.props.itemsInCart.length ? (
            <div className="col-12 row">
              <div className="col-md-8 col-sm-12">
                {cartItems}
              </div>
              <div className="col-md-4 col-sm-12">
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
          ) : (
            <div>
              <h1 className="col-12 mt-3">Nothing in Cart</h1>
              <Link to='/' className="back-home col-12">
                <button className="btn btn-outline-dark">Back to Home</button>
              </Link>
            </div>
          )
          }
        </div>
      </div>
    );
  }
}
