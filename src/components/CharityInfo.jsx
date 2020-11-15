import React, { Component } from "react";
import Image1 from "../images/1.png";
import Image2 from "../images/2.png";
import Image3 from "../images/3.png";
import Image4 from "../images/4.png";
import Image5 from "../images/5.png";
import Image6 from "../images/6.png";

class CharityInfo extends Component {
  state = {
    charityShowMore: "showLess",
    buttonText: "More info",
  };

  handleDescription = () => {
    this.setState((currentState) => {
      return {
        charityShowMore:
          currentState.charityShowMore === "showLess" ? "showMore" : "showLess",
        buttonText:
          currentState.buttonText === "More info" ? "Show less" : "More info",
      };
    });
  };
  render() {
    const imageObj = {
      1: Image1,
      2: Image2,
      3: Image3,
      4: Image4,
      5: Image5,
      6: Image6,
    };
    return (
      <section>
        <div className="charityCardWrapper">
          <div className="charity-info-image">
            <img
              src={imageObj[this.props.charity.charity_id]}
              alt={this.props.charity.name}
              className="charity-image"
            ></img>
          </div>
          <button
            className="charityDisplay-btn"
            onClick={this.handleDescription}
            value="ShowMore"
          >
            {this.state.buttonText}
          </button>
        </div>
        <div className="showMoreText">
          <p className={this.state.charityShowMore}>
            {this.props.charity.description}
          </p>
        </div>
      </section>
    );
  }
}

export default CharityInfo;
