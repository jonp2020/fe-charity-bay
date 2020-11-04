import React, { Component } from "react";

class IndividualItem extends Component {
  state = {
    item: {},
    isLoading: true,
  };
  componentDidMount() {}
	componentDidUpdate() {}
	
	handleChange = (event) => {
		console.log(event.target)
	}
  render() {
    return (
      <section className="individualItem-container">
        <div className="individualItem-card">

          <img className="individualItem-item-image" src="http://placehold.it/300x300" alt="individual-item"></img>
					{/* <div className="individualItem-table-container"> */}
					{/* <div className="individualItem-category">
					<p className="individualItem-category">Electronics</p>
					</div> */}
          
          <p className="individualItem-name">Chess Set</p>
          <p className="individualItem-location">Location: <strong>Manchester</strong></p>
					<p className="individualItem-sellerUsername">Seller: LisaSmith</p>
					<div className="individualItem-price" onClick={this.handleChange}>
          <p className="individualItem-price-amount">£10</p>
					<p className="individualItem-price-text">Donate now</p>
					{/* </div> */}
					</div>

          <p>
            Description text. At vero eos et accusamus et iusto odio dignissimos
            ducimus qui blanditiis praesentium voluptatum deleniti atque
            corrupti quos dolores et quas molestias excepturi sint occaecati
            cupiditate non mollitia animi, id est laborum et dolo
          </p>
        </div>
        <div>
          <p>Money for this item will be donated to Age Concern</p>
        </div>
        <button className="donate-btn">Click to buy and donate</button>
      </section>
    );
  }
}

export default IndividualItem;
