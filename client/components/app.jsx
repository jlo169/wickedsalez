import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
  }

  setView(name, params) {
    const view = { name, params };
    this.setState({ view });
  }

  getProducts() {
    fetch('/api/products.php')
      .then(res => res.json())
      .then(response => {
        this.setState({ products: response });
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div>
        <Header />
        { this.state.view.name === 'catalog'
          ? <ProductList
            productsToBeDisplayed={this.state.products}
            whenProductIsClicked={(name, params) => this.setView(name, params)}
          />
          : <ProductDetails
            viewParams={this.state.view.params}
            setViewMethod={(name, params) => this.setView(name, params)}
          />
        }
      </div>
    );
  }
}
