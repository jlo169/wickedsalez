import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className="container ml-2 col-md-12">
        <h1>WICKED SALEZ</h1>
        <div className="row ">
          <div className="col align-self-start">I am a logo</div>
          <div className="shoppingCart col align-self-end">
            <div><i className="fas fa-shopping-cart"></i></div>
          </div>
        </div>
      </div>
    );
  }
}
