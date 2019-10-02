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

          <div className="pt-3 text-center border-top">
            <div>Thank you for trying out my demo site! </div>
            <div>For more portfolio examples from me, try clicking the links below:</div>
            <div className="col-12 container mx-auto my-3">
              <div className="row">
                <div onClick={() => window.open('http://jonathanlo.dev', '_blank')} className="col-6 personal-sites">
                  <i className="fas fa-user-circle font-awesome-icon"></i>
                  <div className="mt-2">Jonathan Lo&#39;s Portfolio</div>
                </div>
                <div onClick={() => window.open('https://github.com/jlo169', '_blank')} className="col-6 personal-sites">
                  <i className="fab fa-github font-awesome-icon"></i>
                  <div className="mt-2">Jonathan Lo&#39;s Github</div>
                </div>
              </div>
            </div>
            <div>Or if you&#39;d like to play around with this site a bit more, press the button below to complete your (fake) order!</div>
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
