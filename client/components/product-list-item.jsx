import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleProductClick = this.handleProductClick.bind(this);
  }

  handleProductClick(event) {
    event.preventDefault();
    this.props.whenProductIsClicked('details', { id: this.props.product.id });
  }

  render() {
    const product = this.props.product;
    return (
      <div className="card-deck mt-3 col-md-4">
        <div
          className="card bg-light"
          onClick={this.handleProductClick}
        >
          <img
            src={product.image}
            alt="product picture"
            className="img-thumbnail product-image"
          />
          <div>
            <div className="productName col">
              <h5 className="font-weight-bold mb-0">{product.name}</h5>
            </div>
            <div className="productPrice ml-2 col">
              <div className="font-weight-light">{'$' + (product.price / 100).toFixed(2)}</div>
            </div>
            <div className="productDescription mb-3 col">
              <p>{product.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
