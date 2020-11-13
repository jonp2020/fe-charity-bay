import React, { Component } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});
class IndividualItem extends Component {
  state = {
    item: {},
    isLoading: true,
    charity: '',
  };

  componentDidMount() {
    return Promise.all([
      axios.get(
        `https://charity-bay-be.herokuapp.com/api/items/${this.props.item_id}`
      ),
      axios.get('https://charity-bay-be.herokuapp.com/api/charities'),
    ]).then(
      ([
        {
          data: { item },
        },
        {
          data: { charities },
        },
      ]) => {
        const requiredCharity = charities.find(
          (charity) => charity.charity_id === item.charity_id
        );
        this.setState({
          item,
          charity: requiredCharity.name,
          isLoading: false,
        });
      }
    );
  }

  render() {
    const { classes } = this.props;
    const { item, charity, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <section className="individualItem-container">
            <div className="individualItem-card">
              <img
                className="individualItem-item-image"
                src={`${process.env.REACT_APP_S3_BUCKET}/${item.fullsize_img_ref}`}
                alt="individual-item"
              ></img>
              <div className="wrapping">
                <p className="individualItem-name">{item.title}</p>
                <p className="individualItem-location">
                  Location: <strong>{item.location}</strong>
                </p>
                <p className="individualItem-sellerUsername">
                  Seller: {item.seller_username}
                </p>
                <p className="individualItem-price-amount">£{item.price}.00</p>
              </div>
            </div>
            <p className="individualItem-desktop-description">
              {item.description}
            </p>
            <p className="individualItem-desktop-info">
              Money for this item will be donated to <strong>{charity}</strong>
            </p>
            {item.status === 'available' ? (
              <Link to={`/purchase/${item.item_id}`}>
                <button className="donate-btn">Click to buy and donate</button>
              </Link>
            ) : null}
          </section>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(IndividualItem);
