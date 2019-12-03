import React from 'react';
import axios from 'axios';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: null,
      alreadyInCart: false,
      cart: [],
      inputField: false
    };
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.outsideSetValues = this.outsideSetValues.bind(this);
    this.addToCartButtonClicked = this.addToCartButtonClicked.bind(this);
  }

  handleQtyChange(event) {
    let value;
    if (!parseInt(event.target.value)) {
      value = '';
    } else {
      value = parseInt(event.target.value);
    }
    if (value < 6) {
      this.setState({ quantity: value });
    } else {
      this.setState({ quantity: value, inputField: true });
    }
  }

  outsideSetValues(qty) {
    if (!qty || qty < 1) {
      this.setState({ quantity: 1 });
    } else if (qty > 100) {
      this.setState({ quantity: 100 });
    }
  }

  addToCartButtonClicked(event) {
    this.outsideSetValues(this.state.quantity);
    const id = this.state.product.id;
    const value = this.state.quantity;

    this.props.addProductToCart(id, value);
    if (this.state.alreadyInCart === false) {
      this.setState({ alreadyInCart: true });
    }
  }

  getProductDetails(id) {
    axios.get(`/api/products.php?id=${id}`)
      .then(response => {
        let isProductInCart = false;
        for (let cartItem of this.state.cart) {
          if (id === parseInt(cartItem.id)) {
            isProductInCart = true;
            if (cartItem.quantity > 5) {
              this.setState({
                product: response.data[0],
                quantity: cartItem.quantity,
                alreadyInCart: true,
                inputField: true
              });
            } else {
              this.setState({
                product: response.data[0],
                quantity: cartItem.quantity,
                alreadyInCart: true
              });
            }
          }
        }
        if (!isProductInCart) {
          this.setState({ product: response.data[0], quantity: 1 });
        }
      })
      .catch(error => console.error('Error: ', error));
  }

  getCartItems(productId) {
    axios.get('/api/cart.php')
      .then(response => this.setState({ cart: response.data }))
      .then(() => this.getProductDetails(productId))
      .catch(error => console.error(error));
  }

  componentDidMount() {
    let productId = parseInt(this.props.match.params.id);
    this.getCartItems(productId);
  }

  render() {
    const product = this.state.product;

    if (product) {
      return (
        <div className="mt-3">
          <div className="pictureDescription row">
            <div className="imgContainer pr-0 py-2 col-xs-12 col-lg-7">
              <img
                src={product.image}
                alt={product.name}
                className="detailsImg p-1 border border-secondary"
              />
            </div>
            <div className="descriptionContainer container-fluid mx-3 col-xs-12 col-lg-4">
              <h1 className="productName mt-2">{product.name}</h1>
              <div
                className="detailsDescription mt-3"
              >
                ${(product.price / 100).toFixed(2)}
              </div>
              <div className="detailsDescription font-weight-light mt-2">
                {product.players} players
              </div>
              <div className="container mt-3">
                <div className="row">Qty:
                  {!this.state.inputField ? (
                    <select
                      className="form-control form-control-sm col-xs-2 col-md-2 ml-1"
                      id="itemQuantity1"
                      defaultValue={this.state.quantity}
                      onChange={this.handleQtyChange}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6+</option>
                    </select>
                  ) : (
                    <input
                      className="form-control form-control-sm col-xs-2 col-md-2 ml-1"
                      type="number"
                      value={this.state.quantity}
                      min={1}
                      max={100}
                      onChange={this.handleQtyChange}
                    />
                  )
                  }
                  <div className="ml-2">{this.state.alreadyInCart
                    ? '*Item currently in cart'
                    : ''}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success mt-3"
                onClick={this.addToCartButtonClicked}
              >
                {this.state.alreadyInCart
                  ? 'Update Cart'
                  : 'Add to Cart'}
              </button>
            </div>
          </div>
          <div className="longDescription mt-3 pt-3 border-top container">
            {/* While dangerous, dangerouslySetInnerHTML was used to mimic the likes of amazon.com with non-standardized product descriptions */}
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      );
    }
    return null;
  }
}
