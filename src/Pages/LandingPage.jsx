import React, { Component } from "react";
import ItemsListCard from "../components/ItemsListCard";

class LandingPage extends Component {
  state = {
    items: [
      {
        item_id: 1,
        thumbnail_img_ref: "http://placehold.it/50x50",
        fullsize_img_ref: "http://placehold.it/300x300",
        title: "Digifad",
        description:
          "Ut sit do sint in tempor pariatur cupidatat ipsum elit. Deserunt minim consequat amet tempor minim laborum laborum dolore officia. Culpa eu aute laboris non anim minim tempor labore elit ex fugiat id proident. Quis nulla excepteur consectetur elit laborum officia officia. Ex officia in exercitation dolore magna ullamco duis et mollit irure aliqua minim. Irure ipsum reprehenderit magna culpa est nisi ad adipisicing dolore elit consequat adipisicing sint enim.",
        price: 6,
        category: "Toys",
        status: "available",
        seller_username: "Lois James",
        charity_id: 1,
        location: "stockport",
      },
      {
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
      {
        item_id: 3,
        thumbnail_img_ref: "http://placehold.it/50x50",
        fullsize_img_ref: "http://placehold.it/300x300",
        title: "Hiking boots",
        description:
          "Do eiusmod cillum ullamco commodo et exercitation voluptate tempor proident non eu sunt. Ut ex irure aute tempor minim id amet est duis aliqua. Fugiat ut in laboris enim nulla mollit culpa Lorem mollit cupidatat sint. Pariatur nulla fugiat adipisicing cillum nisi ex tempor excepteur commodo.",
        price: 15,
        category: "Clothes",
        status: "available",
        seller_username: "Lois James",
        charity_id: 1,
        location: "stockport",
      },
    ],
    isLoading: true,
  };

  componentDidMount() {}
  componentDidUpdate() {}

  render() {
    const { items } = this.state;
    return (
      <section>
        <div className="navigationButtons">
          <button>How It Works</button>
          <button>Sell an Item</button>
          <button>Filter by</button>
        </div>

        {items.map((item) => {
          return <ItemsListCard key={item.item_id} item={item} />;
        })}
      </section>
    );
  }
}

export default LandingPage;
