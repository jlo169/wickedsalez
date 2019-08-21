import React from 'react';
import axios from 'axios';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
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
  }

  getProductDetails(id) {
    axios.get(`/api/products.php?id=${id}`)
      .then(response => {
        this.setState({ product: response.data[0] });
      })
      .catch(error => console.error('Error: ', error));
  }

  componentDidMount() {
    let productId = parseInt(this.props.match.params.id);
    this.getProductDetails(productId);
  }

  render() {
    const product = this.state.product;

    if (product) {
      return (
        <div className="mt-3">
          <div className="pictureDescription row">
            <div className="imgContainer pr-0 py-2 col-md-7">
              <img
                src={product.image}
                alt={product.name}
                className="detailsImg p-1 border border-secondary"
              />
            </div>
            <div className="descriptionContainer container-fluid mx-3 col-md-4">
              <h1 className="productName mt-2">{product.name}</h1>
              <div
                className="detailsDescription font-weight-light mt-3"
              >
                ${(product.price / 100).toFixed(2)}
              </div>
              <div className="detailsDescription mt-1">
                {product.players}
              </div>
              <div className="container">
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
                </div>
              </div>
              <button
                className="btn btn-success mt-3"
                onClick={this.addToCartButtonClicked}
              >
                Add to cart</button>
            </div>
          </div>
          <div className="longDescription mt-5 container-fluid">
            <div>{product.description}</div>
          </div>
        </div>
      );
    }
    return null;
  }
}
