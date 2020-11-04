import React, { Component } from "react";

class IndividualItem extends Component {
  state = {
    item: {},
    isLoading: true,
  };
  componentDidMount() {}
  componentDidUpdate() {}
  render() {
    return (
      <section className="individualItem-container">
        <div>
          <img src="https://charity-images.s3.eu-west-2.amazonaws.com/1604415525859.jpg"></img>

          <h4>Toys Games</h4>
          <h5>Chess Set</h5>
          <h6>Manchester</h6>
          <p>10£ </p>
          <p>
            Description text. At vero eos et accusamus et iusto odio dignissimos
            ducimus qui blanditiis praesentium voluptatum deleniti atque
            corrupti quos dolores et quas molestias excepturi sint occaecati
            cupiditate non mollitia animi, id est laborum et dolo
          </p>
        </div>
        <div>
          <p>Money for this item donated to Age Concern</p>
        </div>
        <button>Click to buy and donate</button>
      </section>
    );
  }
}

export default IndividualItem;
