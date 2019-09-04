import React, { Component } from 'react';

export default class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      dates: {}
    };

    this.shippingDateCalculation = this.shippingDateCalculation.bind(this);
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

  shippingDateCalculation(today) {
    const deliveryTime = [1, 3, 7];
    const deliveryDates = [];
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

    for (let i = 0; i < deliveryTime.length; i++) {
      let shippingDay = today.getDay() + deliveryTime[i];
      if (shippingDay > 6) {
        shippingDay -= 7;
      }

      let shippingDate = today.getDate() + deliveryTime[i];
      let shippingMonth = today.getMonth();
      if (shippingDate > months[shippingMonth].days) {
        shippingDate -= months[shippingMonth].days;
        shippingMonth++;
        if (shippingMonth > 11) {
          shippingMonth = 0;
        }
      }

      const dateObj = {
        day: days[shippingDay],
        month: months[shippingMonth].month,
        date: shippingDate
      };
      deliveryDates.push(dateObj);
    }
    return deliveryDates;
  }

  componentDidMount() {
    const today = new Date();
    const deliveryDates = this.shippingDateCalculation(today);
    this.setState({ dates: deliveryDates });
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
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" value="option1" checked />
              <label className="form-check-label">
                Default radio
              </label>
            </div>
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
