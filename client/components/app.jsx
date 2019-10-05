import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import ReactModal from 'react-modal';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import CheckoutModal from './checkout-modal';
import PageNotFound from './404';
ReactModal.setAppElement('#root');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      modalIsOpen: false,
      orderDetails: {}
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
    axios.post('/api/orders.php', order)
      .then(response => {
        this.setState({ modalIsOpen: true, orderDetails: response.data });
      })
      .catch(error => console.error('Error: ', error));
  }

  closeModal() {
    this.setState({ modalIsOpen: false, cart: [] });
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
          <Route component={PageNotFound} />
        </Switch>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          orderStuff={this.state.orderDetails}
          onRequestClose={() => this.closeModal}
          contentLabel="Checkout-Modal"
        >
          <CheckoutModal
            orderDetails={this.state.orderDetails}
            closeModal={() => this.closeModal()}
          />
        </ReactModal>
      </div>
    );
  }
}

export default withRouter(App);
