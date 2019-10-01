import React from 'react';

export default class CheckoutModalProducts extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <img
            src={this.props.product.image}
            alt={`${this.props.product.name} image`}
            className="img-thumbnail checkout-image"
          />
          <h5 className="my-auto ml-2">{this.props.product.name}</h5>
          <h5 className="my-auto ml-2">x{this.props.product.quantity}</h5>
        </div>
      </div>
    );
  }
}
