import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);

    this.backButtonClicked = this.backButtonClicked.bind(this);
  }

  sumOfAllPrices() {
    let priceTotal = 0;
    for (let item of this.props.itemsInCart) {
      priceTotal += item.price;
    }
    const averagePrice = '$' + ((priceTotal / 100).toFixed(2));
    return averagePrice;
  }

  backButtonClicked(event) {
    event.preventDefault();
    this.props.setViewMethod('catalog', {});
  }

  render() {
    const cartItems = this.props.itemsInCart.map(cartItem =>
      <CartSummaryItem
        cartItem={cartItem}
        key={cartItem.id}
      />
    );
    let averagePrice = this.sumOfAllPrices();
    // return null;
    return (
      <div className="container">
        <div className="header container-fluid my-2">
          <button
            onClick={this.backButtonClicked}
            className="btn btn-secondary"
          >
            <i className="fas fa-arrow-left"></i> Back to catalog
          </button>
        </div>
        <div className="container">
          <div>
            {cartItems}
          </div>
        </div>
        <h3 className="averagePrice footer fixed-bottom bg-dark py-3 mb-0 text-light">
          Item Total: {averagePrice}
        </h3>

      </div>
    );
  }
}
