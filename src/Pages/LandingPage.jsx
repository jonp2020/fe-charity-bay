import React, { Component } from "react";
import ItemsListCard from "../components/ItemsListCard";
import axios from 'axios';

class LandingPage extends Component {
  state = {
    items: [],
    isLoading: true,
  };

    componentDidMount() {
return axios.get("https://charity-bay-be.herokuapp.com/api/items").then
(({ data: { items } }) => {
this.setState({ items, isLoading: false })
})
  }


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
