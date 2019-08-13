import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: []
    };
  }

  getProducts() {
    axios.get('/api/products.php')
      .then(response => this.setState({ products: response.data }))
      .catch(error => console.error(error));
  }

  getCartItems() {
    axios.get('/api/cart.php')
      .then(response => this.setState({ cart: response.data }))
      .catch(error => console.error(error));
  }

  addToCart(id) {
    axios.post('/api/cart.php', id)
      .then(response => {
        this.setState({ cart: [...this.state.cart, response.data] });
      })
      .catch(error => console.error('Error: ', error));
  }

  placeOrder(order) {
    const cart = this.state.cart;
    const newOrder = {
      customer: order,
      cart: cart
    };

    fetch('/api/orders.php', {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        const defaultViewState = { name: 'catalog', params: {} };
        this.setState({
          cart: [],
          view: defaultViewState
        });
      })
      .catch(err => console.error('Error, ', err));
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  render() {
    return (
      <div>
        <Header
          title="WICKED SALEZ"
          cartItems={this.state.cart}
        />
        <Switch>
          <Route exact path="/" render={props =>
            <ProductList {...props}
              productsToBeDisplayed={this.state.products}
              whenProductIsClicked={(name, params) => this.setView(name, params)}
            />
          }/>
          <Route exact path="/details/:id" render={props =>
            <ProductDetails {...props}
              viewParams={this.state.view.params}
              setViewMethod={(name, params) => this.setView(name, params)}
              addProductToCart={product => this.addToCart(product)}
            />
          }/>
          <Route exact path="/cart" render={props =>
            <CartSummary {...props}
              itemsInCart={this.state.cart}
              setViewMethod={(name, params) => this.setView(name, params)}
            />
          }/>
          <Route exact path="/checkout" render={props =>
            <CheckoutForm {...props}
              itemsInCart={this.state.cart}
              setViewMethod={(name, params) => this.setView(name, params)}
              placingOrder={order => this.placeOrder(order)}
            />
          }/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
