import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutModalProducts from './checkout-modal-products';

export default class CheckoutModal extends React.Component {
  handleButtonClick() {
    this.props.closeModal();
  }

  render() {
    const order = this.props.orderDetails;
    const orderProducts = order.products.map(product =>
      <CheckoutModalProducts
        product={product}
        key={product.id}
      />
    );
    return (
      <div className="row">
        <div className="col-sm-12 col-md-6 border-right">
          <h3>Order Summary</h3>
          {orderProducts}
        </div>
        <div className="col-sm-12 col-md-6">
          <h3>Shipping Address</h3>
          <div>{order.name}</div>
          <div>{order.address}</div>
          <div>{`${order.city}, ${order.state} ${order.zipcode}`}</div>
          <h3 className="mt-3">Price Summary</h3>
          <div>Subtotal: {`$${(order.subtotal / 100).toFixed(2)}`}</div>
          <div>Shipping and Handling: {`$${((order.subtotal / 100) * (order.shipping / 100)).toFixed(2)}`}</div>
          <div>Tax: {`$${(order.tax / 100).toFixed(2)}`}</div>
          <h5>Order total: {`$${(order.orderTotal / 100).toFixed(2)}`}</h5>

          <div className="mt-3 text-center">
            <div>Thank you for trying out my demo site! </div>
            <div>For more portfolio examples from me, try clicking the links below:</div>
            <div>Or if you&#39;d like to play around with this site a bit more, press the button</div>
            <Link to='/' onClick={() => this.handleButtonClick()}>
              <button
                type="button"
                className="btn btn-dark mt-3"
              >
                Return to Home Page
              </button>
            </Link>
          </div>
        </div>

      </div>
    );
  }
}

// order dummy data:
// address: "116 Scenic Crest"
// cart_id: "3"
// city: "Irvine"
// id: "23"
// name: "Jonathan Lo"
// orderTotal: "0"
// products: 0: {name: "Gloomhaven", quantity: "4"}
// shipping: "0"
// state: "CA"
// subtotal: "0"
// tax: "0"
// zipcode: "92618"
