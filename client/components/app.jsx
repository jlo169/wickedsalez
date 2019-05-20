import React from 'react';
import Header from './header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products.php')
      .then(res => res.json())
      .then(response => {
        this.setState({ products: response });
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <Header />
    );
  }
}
