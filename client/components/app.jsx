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

  addToCart(id, qty) {
    const data = { id, qty };
    axios.post('/api/cart.php', data)
      .then(response => {
        this.setState({ cart: response.data });
      })
      .catch(error => console.error('Error: ', error));
  }

  updateCartQty(id, qty) {
    const cartArr = this.state.cart;
    const updatedCartArr = cartArr.map(product => {
      if (parseInt(product.id) === id) {
        product.quantity = qty;
      }
      return product;
    });
    this.setState({ cart: updatedCartArr });
  }

  placeOrder(order) {
    // console.log(order);
    // axios.post('/api/orders.php', order)
    //   .then(response => console.log(response.data))
    //   .catch(error => console.error('Error: ', error));

    // const cart = this.state.cart;
    // const newOrder = {
    //   customer: order,
    //   cart: cart
    // };
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
            />
          }/>
          <Route exact path="/details/:id" render={props =>
            <ProductDetails {...props}
              addProductToCart={(id, qty) => this.addToCart(id, qty)}
              itemsInCart={this.state.cart}
            />
          }/>
          <Route exact path="/cart" render={props =>
            <CartSummary {...props}
              getCart={() => this.getCartItems()}
              itemsInCart={this.state.cart}
              updateQty={(id, qty) => this.updateCartQty(id, qty)}

            />
          }/>
          <Route exact path="/checkout" render={props =>
            <CheckoutForm {...props}
              itemsInCart={this.state.cart}
              placingOrder={order => this.placeOrder(order)}
            />
          }/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
