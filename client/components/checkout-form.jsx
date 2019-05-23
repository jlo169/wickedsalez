import React, { Component } from 'react';

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddr: ''
    };
  }

  backButtonClicked(event) {
    event.preventDefault();
    this.props.setViewMethod('catalog', {});
  }

  sumOfAllPrices() {
    let priceTotal = 0;
    for (let item of this.props.itemsInCart) {
      priceTotal += item.price;
    }
    const averagePrice = '$' + ((priceTotal / 100).toFixed(2));
    return averagePrice;
  }

  handleInputs(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
        <h2 className="title">Checkout</h2>
        <h4 className="totalprice font-weight-light">{averagePrice}</h4>
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
                    Credit Card
          <input
            type="text"
            name="creditCard"
            className="col-md-12"
            onChange={event => this.handleInputs(event)}
          />
        </div>
        <div className="addressInput mt-3">
                    Address
          <textarea
            rows="5"
            name="shippingAddr"
            className="col-md-12"
            onChange={event => this.handleInputs(event)}
          >
          </textarea>
        </div>
        <div className="row">
          <div className="header mr-auto my-2">
            <button
              onClick={event => this.backButtonClicked(event)}
              className="btn btn-secondary"
            >
              <i className="fas fa-arrow-left"></i> Back to catalog
            </button>
          </div>
          <button
            className="btn btn-outline-dark"
            onClick={event => this.handleSubmitButton(event)}>
                        Sell Soul
          </button>
        </div>
      </div>
    );
  }
}
