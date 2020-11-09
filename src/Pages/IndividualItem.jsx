import React, { Component } from "react";
import { Link } from "@reach/router";
import axios from 'axios';


class IndividualItem extends Component {
  state = {
    item: {},
    isLoading: true,
  }

  componentDidMount(){
return axios.get(`https://charity-bay-be.herokuapp.com/api/items/${this.props.item_id}`).then
(({ data: { item } }) => {
this.setState({ item, isLoading: false })
})
  }

  componentDidUpdate() {}

  handleChange = (event) => {
    console.log(event.target);
  };
  render() {
    const { item } = this.state;
    console.log(item);
    return (
      <section className="individualItem-container">
        <div className="individualItem-card">
          <img
            className="individualItem-item-image"
            src={`https://charity-images.s3.eu-west-2.amazonaws.com/${this.state.item.thumbnail_img_ref}`}
            alt="individual-item"
          ></img>
          <div className="wrapping">
            <p className="individualItem-name">{item.title}</p>
            <p className="individualItem-location">
              Location: <strong>{item.location}</strong>
            </p>
            <p className="individualItem-sellerUsername">
              Seller: {item.seller_username}
            </p>
            <p className="individualItem-price-amount">£{item.price}</p>
          </div>
        </div>
        <p className="individualItem-desktop-description">{item.description}</p>
        <p className="individualItem-desktop-info">
          Money for this item will be donated to <strong>Age Concern</strong>
        </p>
        <Link className="donate-btn" to={`/purchase/${item.item_id}`} >
        <button className="donate-btn">Click to buy and donate</button>
        </Link>
      </section>
    );
  }
}

export default IndividualItem;
