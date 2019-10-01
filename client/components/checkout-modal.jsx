import React from 'react';
import CheckoutModalProducts from './checkout-modal-products';

export default class CheckoutModal extends React.Component {
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
        <div className="col-sm-12 col-md-6">
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
          <div>Estimated tax to be collected: {`$${(order.tax / 100).toFixed(2)}`}</div>
          <h5>Order total: {`$${order.orderTotal / 100}`}</h5>
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
