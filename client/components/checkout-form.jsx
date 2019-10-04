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
      shipping: 0,
      subtotal: 0,
      tax: 0,
      orderTotal: 0
    };

    this.sumOfAllPrices = this.sumOfAllPrices.bind(this);
    this.handleShippingOptions = this.handleShippingOptions.bind(this);
  }

  sumOfAllPrices() {
    let priceTotal = 0;
    for (let item of this.props.itemsInCart) {
      priceTotal += (parseInt(item.price) * item.quantity);
    }
    const subtotal = (priceTotal / 100).toFixed(2);
    return subtotal;
  }

  setInitialPrices() {
    const subtotal = parseFloat(this.sumOfAllPrices());
    const shipping = this.state.shipping ? (subtotal * this.state.shipping).toFixed(2) : 0.00;
    const tax = parseFloat((subtotal * 0.0725).toFixed(2));
    const orderTotal = parseFloat(subtotal + shipping + tax).toFixed(2);
    this.setState({ subtotal, shipping, tax, orderTotal });
  }

  updatePrices() {
    const shipping = parseFloat((this.state.subtotal * this.state.shipping).toFixed(2));
    const orderTotal = parseFloat(this.state.subtotal + this.state.tax + shipping).toFixed(2);
    this.setState({ orderTotal });
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

  componentDidUpdate(prevProps) {
    if (prevProps.itemsInCart.length !== this.props.itemsInCart.length) {
      this.setInitialPrices();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">

          {/* Form */}
          <div className="col-md-6">
            <div className="nameInput mt-3">
              Name
              <form>
                <input
                  type="text"
                  name="name"
                  className="col-md-12"
                  onChange={event => this.handleInputs(event)}
                  required
                />
              </form>
            </div>
            <div className="creditCardInput mt-3">
              Address
              <input
                type="text"
                name="address"
                className="col-md-12"
                onChange={event => this.handleInputs(event)}
                required
              />
            </div>
            <div className="addressInput mt-3">
              City
              <input
                type="text"
                name="city"
                className="col-md-12"
                onChange={event => this.handleInputs(event)}
                required
              />
            </div>
            <div className="addressInput mt-3">
              State
              <input
                type="text"
                name="state"
                className="col-md-12"
                onChange={event => this.handleInputs(event)}
                required
              />
            </div>
            <div className="addressInput mt-3">
              Zipcode
              <input
                type="text"
                name="zipcode"
                className="col-md-12"
                onChange={event => this.handleInputs(event)}
                required
              />
            </div>
          </div>

          {/* Shipping */}
          <CheckoutShipping
            sumOfAllPrices={this.sumOfAllPrices}
            handleShippingOptions={event => this.handleShippingOptions(event)}
            shippingState={parseFloat(this.state.shipping)}
          />

          {/* Summary */}
          <CheckoutSummary
            sumOfAllPrices={this.sumOfAllPrices}
            setInitialPrices={() => this.setInitialPrices()}
            updatePrices={() => this.updatePrices()}
            shipping={this.state.shipping}
            subtotal={this.state.subtotal}
            tax={this.state.tax}
            orderTotal={this.state.orderTotal}
          />
          <div className="mt-3 pl-3">
            <button
              className="btn btn-outline-dark"
              onClick={event => this.handleSubmitButton(event)}>
            Sell Soul
            </button>
          </div>
        </div>
      </div>
    );
  }
}
