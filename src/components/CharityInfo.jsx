import React, { Component } from 'react';
import Image1 from '../images/1.png';
import Image2 from '../images/2.png';
import Image3 from '../images/3.png';
import Image4 from '../images/4.png';
import Image5 from '../images/5.png';
import Image6 from '../images/6.png';

class CharityInfo extends Component {
  state = {
    charityShowMore: 'showLess',
    buttonText: 'Show More',
  };

  handleDescription = (event) => {
    console.log(event.target.value);
    this.setState((currentState) => {
      return {
        charityShowMore:
          currentState.charityShowMore === 'showLess' ? 'showMore' : 'showLess',
        buttonText:
          currentState.buttonText === 'Show More' ? 'Show Less' : 'Show More',
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
          <img
            src={imageObj[this.props.charity.charity_id]}
            alt={this.props.charity.name}
            className="charity-image"
          ></img>
          <button
            className="charityDisplay-btn"
            onClick={this.handleDescription}
            value="ShowMore"
          >
            {this.state.buttonText}
          </button>
        </div>
        <p className={this.state.charityShowMore}>
          {this.props.charity.description}
        </p>
      </section>
    );
  }
}

//{require(`../images/${this.props.charity.charity_id}.png`)}

export default CharityInfo;

// imageToShow = () =>  {
//   if(this.props.charity.charity_id === 1){
//                return <img src={Image1} alt={this.props.charity.name}></img>
// }
//   if(this.props.charity.charity_id === 2){
//                return <img src={Image2} alt={this.props.charity.name}></img>
// }
//   if(this.props.charity.charity_id === 3){
//                return <img src={Image3} alt={this.props.charity.name}></img>
// }
//   if(this.props.charity.charity_id === 4){
//                return <img src={Image4} alt={this.props.charity.name}></img>
// }
//   if(this.props.charity.charity_id === 5){
//                return <img src={Image5} alt={this.props.charity.name}></img>
// }
//   if(this.props.charity.charity_id === 6){
//                return <img src={Image6} alt={this.props.charity.name}></img>
// }

// }
