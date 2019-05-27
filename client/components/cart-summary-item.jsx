import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const item = this.props.cartItem;

    return (
      <div className="container border border-secondary bg-light rounded mt-3 col">
        <div className="row">
          <img
            src={item.image}
            alt="item picture"
            className="product-image border-right border-secondary px-0 col-md-4"
          />
          <div
            className="itemDescription align-self-center col-md-8"
          >
            <div className="">
              <h2 className="productName mb-0">{item.name}</h2>
              <h5 className="price font-weight-light mt-0">{'$' + (item.price / 100).toFixed(2)}</h5>
              <div
                className="shortDescription mt-2"
              >
              </div>
              {item.shortDescription}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
