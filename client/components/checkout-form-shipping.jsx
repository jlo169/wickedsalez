import React from 'react';

export default class CheckoutShipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: {}
    };

    this.shippingDateCalculation = this.shippingDateCalculation.bind(this);
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
      { month: 'Sept', days: 30 },
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
      if (shippingDay === 6) {
        shippingDay = 0;
        shippingDate++;
      }
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
    let averagePrice = this.props.sumOfAllPrices();
    const weekShipping = this.state.dates[2];
    const threeDayShipping = this.state.dates[1];
    const oneDayShipping = this.state.dates[0];

    return (
      <div className="mt-3 col-md-2">
        <h3>Shipping</h3>
        <div className="form-check mb-2">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              onChange={event => this.props.handleShippingOptions(event)}
              value={0}
              checked={this.props.shippingState === 0}
            />

            <div className="font-weight-bold">
              {weekShipping
                ? `${weekShipping.day}, ${weekShipping.month} ${weekShipping.date}`
                : ''}
            </div>
            {'FREE'}
          </label>
        </div>
        <div className="form-check mb-2">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              onChange={this.props.handleShippingOptions}
              value={0.05}
              checked={this.props.shippingState === 0.05}
            />

            <div className="font-weight-bold">
              {threeDayShipping
                ? `${threeDayShipping.day}, ${threeDayShipping.month} ${threeDayShipping.date}`
                : ''}
            </div>
            {`$${(averagePrice * 0.05).toFixed(2)}`}
          </label>
        </div>
        <div className="form-check mb-2">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              onChange={event => this.props.handleShippingOptions(event)}
              value={0.1}
              checked={this.props.shippingState === 0.1}
            />

            <div className="font-weight-bold">
              {oneDayShipping
                ? `${oneDayShipping.day}, ${oneDayShipping.month} ${oneDayShipping.date}`
                : ''}
            </div>
            {`$${(averagePrice * 0.1).toFixed(2)}`}
          </label>
        </div>
      </div>
    );
  }
}
