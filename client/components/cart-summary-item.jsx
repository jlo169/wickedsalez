import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    return (
      <div>
        <img src="" alt="item picture"/>
        <div className="itemDescription">
          <div className="productName"></div>
          <div className="price"></div>
          <div className="shortDescription"></div>
        </div>
      </div>
    );
  }
}
