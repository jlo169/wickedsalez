import React, { Component } from 'react';
import CheckoutShipping from './checkout-form-shipping';
import CheckoutSummary from './checkout-form-summary';

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      shipping: 0
    };

    this.handleShippingOptions = this.handleShippingOptions.bind(this);
  }

  sumOfAllPrices() {
    let priceTotal = 0;
    for (let item of this.props.itemsInCart) {
      priceTotal += (parseInt(item.price) * item.quantity);
    }
    const averagePrice = (priceTotal / 100).toFixed(2);
    return averagePrice;
  }

  handleInputs(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleShippingOptions(event) {
    this.setState({ shipping: event.target.value });
  }

  handleSubmitButton(event) {
    event.preventDefault();
    const copyState = Object.assign({}, this.state);
    this.props.placingOrder(copyState);
  }

  render() {
    let averagePrice = this.sumOfAllPrices();

    return (
      <div className="container">
        <div className="row">

          {/* Form */}
          <div className="col-md-6">
            <div className="nameInput mt-3">
              Name
              <input
                type="text"
                name="name"
                className="col-md-12"
                onChange={event => this.handleInputs(event)}
              />
            </div>
            <div className="creditCardInput mt-3">
              Address
              <input
                type="text"
                name="address"
                className="col-md-12"
                onChange={event => this.handleInputs(event)}
              />
            </div>
            <div className="addressInput mt-3">
              City
              <input
                type="text"
                name="city"
                className="col-md-12"
                onChange={event => this.handleInputs(event)}
              />
            </div>
            <div className="addressInput mt-3">
              State
              <input
                type="text"
                name="state"
                className="col-md-12"
                onChange={event => this.handleInputs(event)}
              />
            </div>
            <div className="addressInput mt-3">
              Zipcode
              <input
                type="text"
                name="zipcode"
                className="col-md-12"
                onChange={event => this.handleInputs(event)}
              />
            </div>
          </div>

          {/* Shipping */}
          <CheckoutShipping
            sumOfAllPrices={() => this.sumOfAllPrices()}
            handleShippingOptions={event => this.handleShippingOptions(event)}
            shippingState={parseFloat(this.state.shipping)}
          />

          {/* Summary */}
          <CheckoutSummary
            sumOfAllPrices={() => this.sumOfAllPrices()}
            shippingState={this.state.shipping}

          />
        </div>

        <div className="row">
          <button
            className="btn btn-outline-dark"
            onClick={event => this.handleSubmitButton(event)}>
            Sell Soul
          </button>
        </div>
        <h2 className="title">Checkout</h2>
        <h4 className="totalprice font-weight-light">{averagePrice}</h4>
      </div>
    );
  }
}
