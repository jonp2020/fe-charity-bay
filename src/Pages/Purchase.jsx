import React, { useState, useEffect } from 'react';
import ItemsListCard from '../components/ItemsListCard';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function Purchase(props) {
  const { currentUser } = useAuth();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return axios
      .get(`https://charity-bay-be.herokuapp.com/api/items/${props.item_id}`)
      .then(({ data: { item } }) => {
        setItem(item);
        setLoading(false);
      });
  });

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
  }

  return (
    <div>
      <h1>Review Your Order</h1>
      {!loading && (
        <>
          <ItemsListCard item={item} />
          <h2>Next Steps</h2>
          <button onClick={handleReserve}>
            <a href="http://link.justgiving.com/v1/charity/donate/charityId/11496?amount=2.00&currency=GBP&reference=Age2&exitUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%3FjgDonationId%3DJUSTGIVING-DONATION-ID">
              Donate
            </a>
          </button>
        </>
      )}
    </div>
  );
}
