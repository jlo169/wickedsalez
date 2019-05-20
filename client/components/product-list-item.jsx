import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div>
        <div className="imgContainer">
          <img src="asdfasdf" alt="product picture"/>
        </div>
        <div className="productDescriptionContainer">
          <div className="productName">
          </div>
          <div className="productPrice">
          </div>
          <div className="productDescription">
          </div>
        </div>
      </div>
    );
  }
}
