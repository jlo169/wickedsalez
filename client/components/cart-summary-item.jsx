import React from 'react';
import axios from 'axios';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartQuantity: '',
      deleteHit: false,
      inputField: false
    };

    this.handleCartDelete = this.handleCartDelete.bind(this);
    this.handleInitialCartDeleteToggle = this.handleInitialCartDeleteToggle.bind(this);
    this.offFocus = this.offFocus.bind(this);
  }

  offFocus() {
    if (!this.state.cartQuantity) {
      this.setState({ cartQuantity: 1 });
    }
  }

  handleUpdateQty(event) {
    const productId = parseInt(this.props.cartItem.id);
    let quantity = parseInt(event.target.value);
    let empty = false;
    if (!quantity) {
      quantity = 1;
      empty = true;
    } else if (quantity < 1) {
      quantity = 1;
    } else if (quantity > 100) {
      quantity = 100;
    }
    const qtyUpdate = {
      id: parseInt(this.props.cartItem.cartitems_id),
      qty: quantity
    };

    axios.put('/api/cart-update.php', qtyUpdate)
      .then(response => {
        if (empty) {
          this.setState({ cartQuantity: '' });
        } else if (response.data > 5) {
          this.setState({ cartQuantity: response.data, inputField: true });
        } else {
          this.setState({ cartQuantity: response.data });
        }
      })
      .then(() => this.props.updateQty(productId, qtyUpdate.qty))
      .catch(error => console.error(error));
  }

  handleInitialCartDeleteToggle() {
    const deleteBool = !this.state.deleteHit;
    this.setState({ deleteHit: deleteBool });
  }

  handleCartDelete() {
    const cartIdToDelete = { id: parseInt(this.props.cartItem.cartitems_id) };

    axios.delete('/api/cart-delete.php', { data: cartIdToDelete })
      .then(() => this.props.getCart())
      .catch(error => console.error(error));
  }

  componentDidMount() {
    if (this.props.cartItem.quantity > 5) {
      this.setState({ cartQuantity: parseInt(this.props.cartItem.quantity), inputField: true });
    } else {
      this.setState({ cartQuantity: parseInt(this.props.cartItem.quantity) });
    }
  }

  render() {
    const item = this.props.cartItem;

    return (
      <div className="container border border-secondary bg-light rounded mb-3 col">
        <div className="row">
          <div className="px-0 col-md-4 right-border">
            <img
              src={item.image}
              alt="item picture"
              className="cart-image mx-auto px-auto py-2"
            />
          </div>
          <div className="itemDescription align-self-center col-md-8">
            <div>
              <h4 className="productName mb-0">{item.name}</h4>
              <h5 className="price font-weight-light mt-1 mb-0">{'$' + (item.price / 100).toFixed(2)}</h5>
              <div className="container alt-container">
                <div className="row alt-row mt-1">
                  <div className="col-1 pt-1 px-0">Qty:</div>
                  {this.state.inputField ? (
                    <input
                      className="form-control form-control-sm col-xs-2 col-md-2 ml-1"
                      type="number"
                      min="1"
                      max="100"
                      value={this.state.cartQuantity}
                      onChange={event => this.handleUpdateQty(event)}
                      onBlur={this.offFocus}
                    >
                    </input>
                  ) : (
                    <select
                      className="form-control form-control-sm col-xs-12 col-md-2"
                      id="itemQuantity1"
                      value={this.state.cartQuantity}
                      onChange={event => this.handleUpdateQty(event)}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6+</option>
                    </select>
                  )
                  }
                  {this.state.deleteHit ? (
                    <div className="row col-xs-12 col-md-9 font-weight-light">
                      <div className="col-sm-5 p-0 pl-md-2 pt-1">Are you sure?</div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary col-md-3"
                        onClick={this.handleCartDelete}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className="noButton btn btn-sm btn-secondary col-md-3 ml-sm-1"
                        onClick={this.handleInitialCartDeleteToggle}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div
                      className="delete-button font-weight-light ml-md-2 pt-1"
                      onClick={this.handleInitialCartDeleteToggle}
                    >
                      delete
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
