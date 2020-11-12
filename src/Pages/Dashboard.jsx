import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ItemsListCard from '../components/ItemsListCard';
import Pagination from '../components/Pagination';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [list, setList] = useState('reserved');
  const [page, setPage] = useState(1);
  const [change, setChange] = useState('');
  const classes = useStyles();
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://charity-bay-be.herokuapp.com/api/users/user/${currentUser.email}`
      )
      .then(({ data: { user } }) => {
        if (list === 'reserved' || list === 'purchased') {
          return axios.get(
            `https://charity-bay-be.herokuapp.com/api/items?status=${list}&buyer=${user.username}&p=${page}`
          );
        }
        if (list === 'available') {
          return axios.get(
            `https://charity-bay-be.herokuapp.com/api/items?status=${list}&seller_username=${user.username}&p=${page}`
          );
        }
        if (list === 'sold') {
          return axios.get(
            `https://charity-bay-be.herokuapp.com/api/items?status=purchased&seller_username=${user.username}&p=${page}`
          );
        }
      })
      .then(({ data: { items, itemCount } }) => {
        setItems(items);
        setItemCount(itemCount);
        setLoading(false);
      });
  }, [currentUser.email, list, change, page]);

  async function handlePurchase(item_id) {
    await axios.patch(
      `https://charity-bay-be.herokuapp.com/api/items/${item_id}`,
      { status: 'purchased' }
    );
  }

  async function handleDelete(item) {
    await axios.delete(
      `https://charity-bay-be.herokuapp.com/api/items/${item.item_id}`
    );
    await axios.delete(
      `https://charity-bay-be.herokuapp.com/api/image/${item.thumbnail_img_ref}`
    );
    await axios.delete(
      `https://charity-bay-be.herokuapp.com/api/image/${item.fullsize_img_ref}`
    );
  }
  function changePage(newPage) {
    setPage(newPage);
  }

  function handleMail(item) {
    axios
      .get(
        `https://charity-bay-be.herokuapp.com/api/users/${item.seller_username}`
      )
      .then((result) => {
        const sellerEmail = result.data.user.email;
        const sellerDataToSubmit = {
          email: sellerEmail,
          name: item.seller_username,
          type: 'Sold',
          clientEmail: currentUser.email,
        };
        axios.post(
          'https://charity-bay-be.herokuapp.com/api/mail',
          sellerDataToSubmit
        );

        const buyerDataToSubmit = {
          email: currentUser.email,
          name: item.buyer,
          type: 'Bought',
          clientEmail: sellerEmail,
        };
        axios.post(
          'https://charity-bay-be.herokuapp.com/api/mail',
          buyerDataToSubmit
        );
      });
  }

  const articlesPerPage = 10;
  const pageCount = Math.ceil(itemCount / articlesPerPage);
  const atStart = page === 1;
  const atEnd = page === pageCount;
  const pages = Array.from({ length: pageCount }).map((item, i) => i + 1);
  return (
    <div>
      <h1 className="dashboard-head">Dashboard</h1>
      <div className="btn-container">
        <button
          className="dashboard-btns"
          onClick={() => {
            setList('reserved');
          }}
        >
          Reserved
        </button>
        <button
          className="dashboard-btns"
          onClick={() => {
            setList('purchased');
          }}
        >
          Purchased
        </button>
        <button
          className="dashboard-btns"
          onClick={() => {
            setList('available');
          }}
        >
          For Sale
        </button>
        <button
          className="dashboard-btns"
          onClick={() => {
            setList('sold');
          }}
        >
          Sold
        </button>
      </div>

      {loading ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : list === 'reserved' ? (
        <>
          <h2 className="dashboard-header">Your Reserved Items</h2>
          <p className="reserve-paragraph">
            Once you have donated the money for your reserved item, click the
            'Confirm Purchase' button to notify the seller.
          </p>
          {items.length ? (
            <ul>
              {items.map((item) => {
                return (
                  <div key={item.item_id}>
                    <ItemsListCard item={item} />
                    <button
                      className="action-button"
                      onClick={() => {
                        handlePurchase(item.item_id);
                        setChange('purchased');
                        handleMail(item);
                      }}
                    >
                      Purchase
                    </button>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p>There are no items to display</p>
          )}
        </>
      ) : list === 'purchased' ? (
        <>
          <h2 className="dashboard-header">Your Purchased Items</h2>
          {items.length ? (
            <ul>
              {items.map((item) => {
                return <ItemsListCard key={item.item_id} item={item} />;
              })}
            </ul>
          ) : (
            <p>There are no items to display</p>
          )}
        </>
      ) : list === 'available' ? (
        <>
          <h2 className="dashboard-header">Your Items For Sale</h2>
          {items.length ? (
            <ul>
              {items.map((item) => {
                return (
                  <div key={item.item_id}>
                    <ItemsListCard item={item} />
                    <button
                      className="action-button"
                      onClick={() => {
                        handleDelete(item);
                        setChange('deleted');
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </ul>
          ) : (
            <p>There are no items to display</p>
          )}
        </>
      ) : list === 'sold' ? (
        <>
          <h2 className="dashboard-header">Your Sold Items</h2>
          {items.length ? (
            <ul>
              {items.map((item) => {
                return <ItemsListCard key={item.item_id} item={item} />;
              })}
            </ul>
          ) : (
            <p>There are no items to display</p>
          )}
        </>
      ) : null}
      {items.length && !loading ? (
        <Pagination
          page={page}
          atStart={atStart}
          atEnd={atEnd}
          pages={pages}
          changePage={changePage}
        />
      ) : null}
    </div>
  );
}
