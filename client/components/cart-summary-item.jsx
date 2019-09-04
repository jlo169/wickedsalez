import React from 'react';
import axios from 'axios';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartQuantity: ''
    };

    this.handleCartDelete = this.handleCartDelete.bind(this);
  }

  handleUpdateQty(event) {
    const productId = parseInt(this.props.cartItem.id);
    const qtyUpdate = {
      id: parseInt(this.props.cartItem.cartitems_id),
      qty: parseInt(event.target.value)
    };

    axios.put('/api/cart-update.php', qtyUpdate)
      .then(response => this.setState({ cartQuantity: response.data }))
      .then(() => this.props.updateQty(productId, qtyUpdate.qty))
      .catch(error => console.error(error));
  }

  handleCartDelete(event) {
    const cartIdToDelete = { id: parseInt(this.props.cartItem.cartitems_id) };

    axios.delete('/api/cart-delete.php', { data: cartIdToDelete })
      .then(() => this.props.getCart())
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.setState({ cartQuantity: parseInt(this.props.cartItem.quantity) });
  }

  render() {
    const item = this.props.cartItem;

    return (
      <div className="container border border-secondary bg-light rounded mb-3 col">
        <div className="row">
          <img
            src={item.image}
            alt="item picture"
            className="border-right border-secondary px-0 col-md-4"
          />
          <div className="itemDescription align-self-center col-md-8">
            <div>
              <h4 className="productName mb-0">{item.name}</h4>
              <h5 className="price font-weight-light mt-0">{'$' + (item.price / 100).toFixed(2)}</h5>
              <div className="container">
                <div className="row">
                  <div className="pt-1">Qty:</div>
                  <select
                    className="form-control form-control-sm col-xs-2 col-md-2 ml-1"
                    id="itemQuantity1"
                    value={this.state.cartQuantity}
                    onChange={event => this.handleUpdateQty(event)}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                  <div className="pt-1" onClick={this.handleCartDelete}>delete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
