import React, { Component } from 'react';
import ItemsListCard from '../components/ItemsListCard';
import axios from 'axios';

class Purchase extends Component {

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

  //onSubmit to change the status in state once donate button clicked??

  render() {
    console.log(this.props);
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