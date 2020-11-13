import React, { Component } from 'react';
import ItemsListCard from '../components/ItemsListCard';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { navigate } from '@reach/router';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});

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
      .get(
        `https://charity-bay-be.herokuapp.com/api/items?p=${page}&status=available`
      )
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
          params: {
            p: page,
            order: order,
            category,
            sortBy,
            status: 'available',
          },
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
    const { items, itemCount, page, sortBy, isLoading } = this.state;
    const { classes } = this.props;
    const articlesPerPage = 10;
    const pageCount = Math.ceil(itemCount / articlesPerPage);
    const atStart = page === 1;
    const atEnd = page === pageCount;
    const pages = Array.from({ length: pageCount }).map((item, i) => i + 1);
    return (
      <section className="main-section-container">
        {isLoading ? (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="navigationButtons">
            <div>
              <button
                className="howItWorks-btn"
                onClick={() => {
                  navigate('/about');
                }}
              >
                How it works
              </button>
              <button
                onClick={() => {
                  navigate('/post_item');
                }}
              >
                Sell an item
              </button>
            </div>
            <div className="sort-data-items-wrapper">
              <select
                className="sort-data-item sort-data-item-cats"
                defaultValue={''}
                onChange={this.handleFilter}
              >
                <option disabled value="">
                  Categories
                </option>
                <option value="Toys">Toys</option>
                <option value="Clothes">Clothes</option>
                <option value="Kitchenware">Kitchenware</option>
                <option value="Books">Books</option>
                <option value="Garden">Garden</option>
                <option value="Electronics">Electronics</option>
              </select>
              <div className="select-box-gap"></div>
              <select
                className="sort-data-item sort-data-item-price"
                defaultValue={''}
                onChange={this.handleSort}
              >
                <option disabled value="">
                  &nbsp;&nbsp;&nbsp;&nbsp;Sort by
                </option>
                <option value="thumbnail_img_ref">Date</option>
                <option value="price">Price</option>
              </select>
              <div className="select-box-gap"></div>

              {sortBy === 'thumbnail_img_ref' && (
                <select
                  className="sort-data-item sort-data-item-age"
                  defaultValue={''}
                  onChange={this.handleOrder}
                >
                  <option disabled value="">
                    &nbsp;&nbsp; Order by
                  </option>
                  <option value="desc">Most recent</option>
                  <option value="asc">Oldest</option>
                </select>
              )}
              {sortBy === 'price' && (
                <select
                  className="sort-data-item sort-data-item-price"
                  defaultValue={''}
                  onChange={this.handleOrder}
                >
                  <option disabled value="">
                    -- Order --
                  </option>
                  <option value="desc">Highest</option>
                  <option value="asc">Lowest</option>
                </select>
              )}
            </div>
          </div>
        )}
        {items.map((item) => {
          return <ItemsListCard key={item.item_id} item={item} />;
        })}
        {!isLoading && (
          <Pagination
            page={page}
            atStart={atStart}
            atEnd={atEnd}
            pages={pages}
            changePage={this.changePage}
          />
        )}
      </section>
    );
  }
}

export default withStyles(styles)(LandingPage);
