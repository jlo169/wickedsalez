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
      <div>
        <div className="filter col-12">

        </div>
        <div className="container-fluid row">
          {products}
        </div>
      </div>
    );
  }
}
