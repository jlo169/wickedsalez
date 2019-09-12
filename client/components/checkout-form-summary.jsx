import React from 'react';

export default class CheckoutSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averagePrice: 0,
      shippingMod: 0,
      tax: 0,
      orderTotal: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.shippingState !== prevProps.shippingState) {
      const shipping = parseInt((this.state.averagePrice * this.props.shippingState).toFixed(2));
      const orderTotal = parseFloat(this.state.averagePrice + this.state.tax + shipping).toFixed(2);
      this.setState({ orderTotal, shippingMod: this.props.shippingState });
    }
  }

  componentDidMount() {
    const averagePrice = parseFloat(this.props.sumOfAllPrices());
    const shippingMod = this.props.shippingState ? (averagePrice * this.props.shippingState).toFixed(2) : 0.00;
    const tax = parseFloat((averagePrice * 0.0725).toFixed(2));
    const orderTotal = parseFloat(averagePrice + shippingMod + tax).toFixed(2);
    this.setState({ averagePrice, shippingMod, tax, orderTotal });
  }

  render() {
    return (
      <div className="col-md-4">
        <h3>Order Summary</h3>
        <div>Items: {this.state.averagePrice}</div>
        <div>Shipping and Handling: {this.state.shippingMod}</div>
        <div>Estimated tax to be collected: {this.state.tax}</div>
        <h5>Order total: {this.state.orderTotal}</h5>
      </div>
    );
  }
}
