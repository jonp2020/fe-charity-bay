import React, { Component } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import Trust from "../images/./img-caro/trust.jpg";
import Signup from "../images/./img-caro/signup.jpg";
import Buy from "../images/./img-caro/buy.jpg";
import Choose from "../images/./img-caro/choose.jpg";
import Donate from "../images/./img-caro/donate.jpg";
import Confirm from "../images/./img-caro/confirm.jpg";
import Message from "../images/./img-caro/message.jpg";
import Delivery from "../images/./img-caro/delivery.jpg";
import Thanks from "../images/./img-caro/thanks.jpg";

import "pure-react-carousel/dist/react-carousel.es.css";

export default class HowItWorks extends Component {
  render() {
    return (
      <CarouselProvider
        // className="naturalSlideHeight"
        naturalSlideWidth={30}
        // naturalSlideHeight={2}
        isIntrinsicHeight={true}
        totalSlides={9}
        touchEnabled={true}
      >
        <div className="carousel-wrapper">
          <Slider className="carousel-slider">
            <Slide className="background-colour-carousel-odd" index={0}>
              <img className="carousel-img" src={Trust} alt="trust"></img>
              <p>
                <span className="lobster-font">CharityBay</span> is a website
                built on trust.
              </p>
            </Slide>
            <Slide className="background-colour-carousel-even" index={1}>
              <img className="carousel-img" src={Signup} alt="signup"></img>

              <p>
                <strong>Sign up</strong> to CharityBay to buy or sell anything
                you no longer want or need.
              </p>
            </Slide>
            <Slide className="background-colour-carousel-odd" index={2}>
              <img className="carousel-img" src={Buy} alt="buy-and-sell"></img>

              <p>You can buy and sell items from a variety of categories.</p>
            </Slide>
            <Slide className="background-colour-carousel-even" index={3}>
              <img
                className="carousel-img"
                src={Choose}
                alt="choose-charity"
              ></img>

              <p>
                You can choose a charity that you would like the money to go to
                for each item you are selling.
              </p>
            </Slide>
            <Slide className="background-colour-carousel-odd" index={4}>
              <img className="carousel-img" src={Donate} alt="donate"></img>

              <p>
                If you want to buy an item, you will be directed to the Just
                Giving donate page that was selected by the seller. Here you can
                donate the money for that item.
              </p>
            </Slide>
            <Slide className="background-colour-carousel-even" index={5}>
              <img
                className="carousel-img"
                src={Confirm}
                alt="confirm-donation"
              ></img>
              <p>
                Once you have made your donation, you will be taken back to
                CharityBay where you will need to confirm your purchase in order
                to alert the seller.
              </p>
            </Slide>
            <Slide className="background-colour-carousel-odd" index={6}>
              <img
                className="carousel-img"
                src={Message}
                alt="send-message"
              ></img>
              <p>
                Both the buyer and seller will receive email notifications with
                each other's contact details.
              </p>
            </Slide>
            <Slide className="background-colour-carousel-even" index={7}>
              <img
                className="carousel-img"
                src={Delivery}
                alt="arrange-delivery"
              ></img>
              <p>
                The seller will arrange for the item to be delivered to the
                buyer.
              </p>
            </Slide>
            <Slide className="background-colour-carousel-odd" index={8}>
              <img className="carousel-img" src={Thanks} alt="thanks"></img>
              <p>Happy CharityBaying!</p>
            </Slide>
          </Slider>
          <ButtonBack className="carousel-btn">&#60;</ButtonBack>
          <ButtonNext className="carousel-btn">&#62;</ButtonNext>
        </div>
      </CarouselProvider>
    );
  }
}
