import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  render() {
    const products = this.props.products.map(product =>
      <ProductListItem property={product} key={product.id} />
    );

    return (
      <div>
        {products}
      </div>
    );
  }
}
