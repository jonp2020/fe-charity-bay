import React, { Component } from 'react';
import ItemsListCard from '../components/ItemsListCard';
import axios from 'axios';
import Pagination from '../components/Pagination';

class LandingPage extends Component {
  state = {
    items: [],
    page: 1,
    isLoading: true,
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
    const { page } = this.state;
    if (prevState.page !== page) {
      return axios
        .get(`https://charity-bay-be.herokuapp.com/api/items?p=${page}`)
        .then(({ data: { items, itemCount } }) => {
          this.setState({ items, itemCount, isLoading: false });
        });
    }
  }

  changePage = (newPage) => {
    this.setState({ page: newPage });
  };

  render() {
    const { items, itemCount, page } = this.state;
    const articlesPerPage = 10;
    const pageCount = Math.ceil(itemCount / articlesPerPage);
    const atStart = page === 1;
    const atEnd = page === pageCount;
    const pages = Array.from({ length: pageCount }).map((item, i) => i + 1);
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
