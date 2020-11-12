// import React, { Component } from "react";
import React from 'react';
import axios from 'axios';
import CharityInfo from './CharityInfo';

export default class CharitiesSupported extends React.Component {
  state = {
    charities: [],
    charityShowMore: '',
    isLoading: true,
  };

  componentDidMount = () => {
    axios
      .get('https://charity-bay-be.herokuapp.com/api/charities')
      .then(({ data: { charities } }) => {
        this.setState({ charities: charities, isLoading: false });
      });
  };

  render() {
    if (this.state.isLoading) return <p>Loading charities</p>;
    const { charities } = this.state;

    return (
      <>
        {charities.map((charity) => {
          return <CharityInfo key={charity.charity_id} charity={charity} />;
        })}
      </>
    );
  }
}
