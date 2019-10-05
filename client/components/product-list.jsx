import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'Co-op, Competitive',
      products: []
    };
  }

  render() {
    const products = this.props.productsToBeDisplayed.map(product =>
      <ProductListItem
        product={product}
        key={product.id}
      />
    );

    return (
      <div className="container-fluid">
        <div className="row">
          {products}
        </div>
      </div>
    );
  }
}
