import React, { Component } from 'react';
import ItemsListCard from '../components/ItemsListCard';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { navigate } from '@reach/router';

class LandingPage extends Component {
  state = {
    items: [],
    page: 1,
    isLoading: true,
    order: 'desc',
    category: undefined,
    sortBy: 'thumbnail_img_ref',
  };

  componentDidMount() {
    const { page } = this.state;
    return axios
      .get(`https://charity-bay-be.herokuapp.com/api/items?p=${page}`)
      .then(({ data: { items, itemCount } }) => {
        this.setState({ items, itemCount, isLoading: false });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, order, category, sortBy } = this.state;
    if (
      prevState.page !== page ||
      prevState.order !== order ||
      prevState.category !== category ||
      prevState.sortBy !== sortBy
    ) {
      return axios
        .get('https://charity-bay-be.herokuapp.com/api/items', {
          params: { p: page, order: order, category, sortBy },
        })
        .then(({ data: { items, itemCount } }) => {
          this.setState({ items, itemCount, isLoading: false });
        });
    }
  }

  handleFilter = (e) => {
    this.setState({ category: e.target.value });
  };

  handleSort = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  handleOrder = (e) => {
    this.setState({ order: e.target.value });
  };

  changePage = (newPage) => {
    this.setState({ page: newPage });
  };

  render() {
    const { items, itemCount, page, sortBy } = this.state;
    const articlesPerPage = 10;
    const pageCount = Math.ceil(itemCount / articlesPerPage);
    const atStart = page === 1;
    const atEnd = page === pageCount;
    const pages = Array.from({ length: pageCount }).map((item, i) => i + 1);
    return (
      <section>
        <div className="navigationButtons">
          <button
            onClick={() => {
              navigate('/about');
            }}
          >
            How It Works
          </button>
          <button
            onClick={() => {
              navigate('/post_item');
            }}
          >
            Sell an Item
          </button>
          <select defaultValue={''} onChange={this.handleFilter}>
            <option disabled value="">
              -- Filter By --
            </option>
            <option value="Toys">Toys</option>
            <option value="Clothes">Clothes</option>
            <option value="Kitchenware">Kitchenware</option>
            <option value="Books">Books</option>
            <option value="Garden">Garden</option>
            <option value="Electronics">Electronics</option>
          </select>
          <select defaultValue={''} onChange={this.handleSort}>
            <option disabled value="">
              -- Sort By --
            </option>
            <option value="thumbnail_img_ref">Date</option>
            <option value="price">Price</option>
          </select>
          {sortBy === 'thumbnail_img_ref' && (
            <select defaultValue={''} onChange={this.handleOrder}>
              <option disabled value="">
                -- Order --
              </option>
              <option value="desc">Most recent</option>
              <option value="asc">Oldest</option>
            </select>
          )}
          {sortBy === 'price' && (
            <select defaultValue={''} onChange={this.handleOrder}>
              <option disabled value="">
                -- Order --
              </option>
              <option value="desc">Highest</option>
              <option value="asc">Lowest</option>
            </select>
          )}
        </div>

        {items.map((item) => {
          return <ItemsListCard key={item.item_id} item={item} />;
        })}
        <Pagination
          page={page}
          atStart={atStart}
          atEnd={atEnd}
          pages={pages}
          changePage={this.changePage}
        />
      </section>
    );
  }
}

export default LandingPage;
