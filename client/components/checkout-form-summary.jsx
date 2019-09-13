import React from 'react';

export default class CheckoutSummary extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.shipping !== prevProps.shipping) {
      this.props.updatePrices();
    }
  }

  componentDidMount() {
    this.props.setInitialPrices();
  }

  render() {
    return (
      <div className="col-md-4">
        <h3>Order Summary</h3>
        <div>Subtotal: {`$${(this.props.subtotal).toFixed(2)}`}</div>
        <div>Shipping and Handling: {`$${(this.props.subtotal * this.props.shipping).toFixed(2)}`}</div>
        <div>Estimated tax to be collected: {`$${(this.props.tax).toFixed(2)}`}</div>
        <h5>Order total: {`$${this.props.orderTotal}`}</h5>
      </div>
    );
  }
}
