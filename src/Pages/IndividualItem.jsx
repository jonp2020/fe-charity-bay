import React, { Component } from "react";

class IndividualItem extends Component {
  state = {
    item: {
      item_id: 2,
      thumbnail_img_ref: "http://placehold.it/50x50",
      fullsize_img_ref: "http://placehold.it/300x300",
      title: "Belt with fake diamonds",
      description:
        "Dolor enim tempor consectetur amet occaecat ex exercitation consectetur et enim. Cupidatat irure eiusmod fugiat est enim velit adipisicing culpa aute nulla excepteur dolor cupidatat ex. Esse est sint irure sint quis magna consequat.",
      price: 5,
      category: "Clothes",
      status: "available",
      seller_username: "Lois James",
      charity_id: 1,
      location: "stockport",
    },
    isLoading: true,
  };
  componentDidMount() {}
  componentDidUpdate() {}

  handleChange = (event) => {
    console.log(event.target);
  };
  render() {
    const { item } = this.state;
    return (
      <section className="individualItem-container">
        <div className="individualItem-card">
          <img
            className="individualItem-item-image"
            src={item.fullsize_img_ref}
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
        <button className="donate-btn">Click to buy and donate</button>
      </section>
    );
  }
}

export default IndividualItem;
