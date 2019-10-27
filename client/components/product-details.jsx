import React from 'react';
import axios from 'axios';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: null,
      alreadyInCart: false,
      cart: []
    };
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.addToCartButtonClicked = this.addToCartButtonClicked.bind(this);
  }

  handleQtyChange(event) {
    let value = parseInt(event.target.value);
    this.setState({ quantity: value });
  }

  addToCartButtonClicked(event) {
    event.preventDefault();
    const { id } = this.state.product;
    const qty = this.state.quantity;
    this.props.addProductToCart(id, qty);
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
            this.setState({
              product: response.data[0],
              quantity: cartItem.quantity,
              alreadyInCart: true
            });
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
    // console.log(this.state.product.description);

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
                  </select>
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
