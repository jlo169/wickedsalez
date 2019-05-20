import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <div className="col-md-4">
        <div className="imgContainer col">
          <img
            src={product.image}
            alt="product picture"
            className="img-thumbnail"
          />
        </div>
        <div className="productDescriptionContainer">
          <div className="productName col">
            <h3 className="font-weight-bold mb-0">{product.name}</h3>
          </div>
          <div className="productPrice col">
            <div className="font-weight-light">{'$' + (product.price / 100).toFixed(2)}</div>
          </div>
          <div className="productDescription col">
            <div>{product.shortDescription}</div>
          </div>
        </div>
      </div>
    );
  }
}
