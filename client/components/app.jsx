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
      },
      cart: []
    };
  }

  setView(name, params) {
    const view = { name, params };
    this.setState({ view });
  }

  getProducts() {
    fetch('/api/products.php')
      .then(res => res.json())
      .then(response => this.setState({ products: response }));
  }

  getCartItems() {
    fetch('/api/cart.php')
      .then(res => res.json())
      .then(response => this.setState({ cart: response }));
  }

  addToCart(product) {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => this.setState({ cart: [...this.state.cart, response] }));
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  render() {
    return (
      <div>
        <Header
          cartItems={this.state.cart}
        />
        { this.state.view.name === 'catalog'
          ? <ProductList
            productsToBeDisplayed={this.state.products}
            whenProductIsClicked={(name, params) => this.setView(name, params)}
          />
          : <ProductDetails
            viewParams={this.state.view.params}
            setViewMethod={(name, params) => this.setView(name, params)}
            addProductToCart={product => this.addToCart(product)}
          />
        }
      </div>
    );
  }
}
