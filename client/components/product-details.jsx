import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.backButtonClicked = this.backButtonClicked.bind(this);
  }

  backButtonClicked(event) {
    event.preventDefault();
    this.props.setViewMethod('catalog', {});
  }

  componentDidMount() {
    const productId = this.props.viewParams.id;

    fetch(`/api/products.php?id=${productId}`)
      .then(res => res.json())
      .then(response => this.setState({ product: response }))
      .catch(error => console.error('Error: ', error));
  }

  render() {
    const product = this.state.product;

    if (product) {
      return (
        <div>
          <div className="header my-2 container-fluid">
            <button
              onClick={this.backButtonClicked}
              className="btn btn-secondary"
            >
              <i className="fas fa-arrow-left"></i> Back to catalog
            </button>
          </div>
          <div className="pictureDescription row">
            <div className="imgContainer pr-0 col-md-7">
              <img
                src={product.image}
                alt={product.name}
                className="col"
              />
            </div>
            <div className="descriptionContainer container-fluid mx-3 col-md-4">
              <h1 className="productName mt-2">{product.name}</h1>
              <div
                className="detailsDescription font-weight-light mt-3"
              >
                ${(product.price / 100).toFixed(2)}
              </div>
              <div
                className="detailsDescription mt-3"
              >
                {product.shortDescription}
              </div>
            </div>
          </div>
          <div className="longDescription mt-5 container-fluid">
            <div>{product.longDescription}</div>
          </div>
        </div>
      );
    }
    return null;
  }
}
