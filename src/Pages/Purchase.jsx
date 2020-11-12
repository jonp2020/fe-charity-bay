import React, { useState, useEffect } from 'react';
import ItemsListCard from '../components/ItemsListCard';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { navigate } from '@reach/router';

export default function Purchase(props) {
  const { currentUser } = useAuth();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://charity-bay-be.herokuapp.com/api/items/${props.item_id}`)
      .then(({ data: { item } }) => {
        setItem(item);
        setLoading(false);
      });
  }, [props.item_id]);

  async function handleReserve() {
    const {
      data: { user },
    } = await axios.get(
      `https://charity-bay-be.herokuapp.com/api/users/user/${currentUser.email}`
    );
    await axios.patch(
      `https://charity-bay-be.herokuapp.com/api/items/${props.item_id}`,
      { status: 'reserved', buyer: user.username }
    );
    item.charity_id === 1
      ? navigate(
          'http://link.justgiving.com/v1/charity/donate/charityId/11496?amount=20.00&currency=GBP&reference=AgeUK&exitUrl=https%3A%2F%2Fcharity-bay.netlify.app%2Fdashboard%3FjgDonationId%3DJUSTGIVING-DONATION-ID'
        )
      : item.charity_id === 2
      ? navigate(
          'http://link.justgiving.com/v1/charity/donate/charityId/66?amount=20.00&currency=GBP&reference=Crisis&exitUrl=https%3A%2F%2Fcharity-bay.netlify.app%2Fdashboard%3FjgDonationId%3DJUSTGIVING-DONATION-ID'
        )
      : item.charity_id === 3
      ? navigate(
          'http://link.justgiving.com/v1/charity/donate/charityId/11033?amount=20.00&currency=GBP&reference=BRC&exitUrl=https%3A%2F%2Fcharity-bay.netlify.app%2Fdashboard%3FjgDonationId%3DJUSTGIVING-DONATION-ID'
        )
      : item.charity_id === 4
      ? navigate(
          'http://link.justgiving.com/v1/charity/donate/charityId/107651?amount=20.00&currency=GBP&reference=WA&exitUrl=https%3A%2F%2Fcharity-bay.netlify.app%2Fdashboard%3FjgDonationId%3DJUSTGIVING-DONATION-ID'
        )
      : item.charity_id === 5
      ? navigate(
          'http://link.justgiving.com/v1/charity/donate/charityId/182158?amount=20.00&currency=GBP&reference=FS&exitUrl=https%3A%2F%2Fcharity-bay.netlify.app%2Fdashboard%3FjgDonationId%3DJUSTGIVING-DONATION-ID'
        )
      : item.charity_id === 6
      ? navigate(
          'http://link.justgiving.com/v1/charity/donate/charityId/2808218?amount=20.00&currency=GBP&reference=NHS&exitUrl=https%3A%2F%2Fcharity-bay.netlify.app%2Fdashboard%3FjgDonationId%3DJUSTGIVING-DONATION-ID'
        )
      : navigate('https://charity-bay.netlify.app/');
  }

  return (
    <div>
      <h1>Review Your Order</h1>
      {!loading && (
        <>
          <ItemsListCard item={item} />
          <h2 className="purchase-info-header">Next Steps</h2>
          <p className="purchase-instructions">
            1. Once you click the 'Donate' button below, you will be taken to
            the JustGiving donate page for the charity selected by the seller.
            Please amend the donation amount to match the price of your item.
          </p>
          <p className="purchase-instructions">
            2. After you have completed your donation, you will be redirected to
            your CharityBay dashboard.
          </p>
          <p className="purchase-instructions">
            3. On your dashboard, in <strong>Reserved Items</strong>, you can
            complete the purchase process by clicking the 'Confirm Purchase'
            button to notify the seller.
          </p>
          <button className="donate-btn" onClick={handleReserve}>
            Donate
          </button>
        </>
      )}
    </div>
  );
}
