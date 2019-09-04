import React, { Component } from 'react';

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: {},
      name: '',
      address: '',
      city: '',
      state: '',
      zipcode: ''
    };
  }

  sumOfAllPrices() {
    let priceTotal = 0;
    for (let item of this.props.itemsInCart) {
      priceTotal += parseInt(item.price);
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

  shippingDateCalculation(mod) {
    const today = this.state.date;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = [
      { month: 'Jan', days: 31 },
      { month: 'Feb', days: 28 },
      { month: 'Mar', days: 31 },
      { month: 'Apr', days: 30 },
      { month: 'May', days: 31 },
      { month: 'Jun', days: 30 },
      { month: 'Jul', days: 31 },
      { month: 'Aug', days: 31 },
      { month: 'Sep', days: 30 },
      { month: 'Oct', days: 31 },
      { month: 'Nov', days: 30 },
      { month: 'Dec', days: 31 }
    ];

    let shippingDay = today.getDay + mod;
    if (shippingDay > 6) {
      shippingDay -= 7;
    }

    let shippingDate = today.getDate + mod;
    let shippingMonth = today.getMonth;
    if (shippingDate > shippingMonth.days) {
      shippingDate -= shippingMonth.days;
      shippingMonth++;
      if (shippingMonth > 11) {
        shippingMonth = 0;
      }
    }

    const dateObj = {
      day: days[shippingDay],
      month: months[shippingMonth],
      date: shippingDate
    };
    return dateObj;
  }

  componentDidMount() {
    const today = new Date();
    this.setState({ date: today });
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
          <div className="col-md-2">
            PUG
          </div>

          {/* Summary */}
          <div className="col-md-4">
            A-WUG
          </div>
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
