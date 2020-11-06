import React, { Component } from 'react';
import ItemsListCard from '../components/ItemsListCard';

class Purchase extends Component {

state = {
 item: {  item_id: 2,
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
}

  render() {
    return (
      <div>
        <h1>Review Your Order</h1>
        <ItemsListCard item={this.state.item}/>
        <h2>Next Steps</h2>
      <button>
       <a href="http://link.justgiving.com/v1/charity/donate/charityId/11496?amount=2.00&currency=GBP&reference=Age2&exitUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%3FjgDonationId%3DJUSTGIVING-DONATION-ID">Donate</a>
       </button>
      </div>
    );
  }
}

export default Purchase;