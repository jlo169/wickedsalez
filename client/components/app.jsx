import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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
      .then(response =>
        this.setState({ cart: response }));
  }

  addToCart(id) {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ cart: [...this.state.cart, response] });
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
    // const currentPage = this.state.view.name;
    // let newPageTarget = '';
    // if (currentPage === 'catalog') {
    //   newPageTarget = <ProductList
    //     productsToBeDisplayed={this.state.products}
    //     whenProductIsClicked={(name, params) => this.setView(name, params)}
    //   />;
    // } else if (currentPage === 'details') {
    //   newPageTarget = <ProductDetails
    //     viewParams={this.state.view.params}
    //     setViewMethod={(name, params) => this.setView(name, params)}
    //     addProductToCart={product => this.addToCart(product)}
    //   />;
    // } else if (currentPage === 'cart') {
    //   newPageTarget = <CartSummary
    //     itemsInCart={this.state.cart}
    //     setViewMethod={(name, params) => this.setView(name, params)}
    //   />;
    // } else if (currentPage === 'checkout') {
    //   newPageTarget = <CheckoutForm
    //     itemsInCart={this.state.cart}
    //     setViewMethod={(name, params) => this.setView(name, params)}
    //     placingOrder={order => this.placeOrder(order)}
    //   />;
    // }

    return (
      <div>
        <Header
          cartItems={this.state.cart}
          setViewMethod={(name, params) => this.setView(name, params)}
        />
        {/* {newPageTarget} */}
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
