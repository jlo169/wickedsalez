import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    const item = this.props.cartItem;

    return (
      <div className="container border border-secondary bg-light rounded mb-3 col">
        <div className="row">
          <img
            src={item.image}
            alt="item picture"
            className="border-right border-secondary px-0 col-md-4"
          />
          <div className="itemDescription align-self-center col-md-8">
            <div>
              <h4 className="productName mb-0">{item.name}</h4>
              <h5 className="price font-weight-light mt-0">{'$' + (item.price / 100).toFixed(2)}</h5>
              <div className="container">
                <div className="row">Qty:
                  <select
                    className="form-control form-control-sm col-xs-2 col-md-2 ml-1"
                    id="itemQuantity1"
                    defaultValue={item.quantity}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6+</option>
                  </select>
                </div>
              </div>
              {/* <div
                className="shortDescription mt-2"
              >
              </div>
              {item.shortDescription} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
