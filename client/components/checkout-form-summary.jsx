import React from 'react';

export default class CheckoutSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
  }

  render() {
    const averagePrice = parseFloat(this.props.sumOfAllPrices());
    const shippingPrice = this.props.shippingState ? (averagePrice * this.props.shippingState).toFixed(2) : 0.00;
    const tax = parseFloat((averagePrice * 0.0725).toFixed(2));
    const orderTotal = parseFloat(averagePrice + shippingPrice + tax).toFixed(2);

    return (
      <div className="col-md-4">
        <h3>Order Summary</h3>
        <div>Items: {averagePrice}</div>
        <div>Shipping and Handling: {shippingPrice}</div>
        <div>Estimated tax to be collected: {tax}</div>
        <h5>Order total: {orderTotal}</h5>
      </div>
    );
  }
}
