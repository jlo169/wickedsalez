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
      priceTotal += parseInt(item.price);
    }
    const averagePrice = '$' + ((priceTotal / 100).toFixed(2));
    return averagePrice;
  }

  backButtonClicked(event) {
    event.preventDefault();
    this.props.setViewMethod('catalog', {});
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
        <div className="header container-fluid my-2">
          <button
            onClick={this.backButtonClicked}
            className="btn btn-secondary"
          >
            <i className="fas fa-arrow-left"></i> Back to catalog
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-8">
              {cartItems}
            </div>
            <div className="col-4 border border-secondary rounded">
              <h3 className="">Item Total: {averagePrice}</h3>
              <button
                className="btn btn-secondary"
                onClick={event => this.checkoutButtonClicked(event)}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
        {/* <div className="averagePrice row footer fixed-bottom bg-dark py-4 mb-0">
          <h3 className="text-light ml-5">Item Total: {averagePrice}</h3>
          <button
            className="btn btn-outline-light offset-md-7 ml-xs-5"
            onClick={event => this.checkoutButtonClicked(event)}
          >
            Checkout</button>
        </div> */}

      </div>
    );
  }
}
