import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  render() {
    const products = this.props.productsToBeDisplayed.map(product =>
      <ProductListItem
        product={product}
        key={product.id}
      />
    );

    return (
      <div className="container-fluid row">
        {products}
      </div>
    );
  }
}
