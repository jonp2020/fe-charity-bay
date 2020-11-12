import React, { Component } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
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
        <div className="carousel-container">
          <Slider className="carousel-slider">
            <Slide index={0}>
              <p>
                <span className="lobster-font">CharityBay</span> is a website
                built on trust.
              </p>
            </Slide>
            <Slide index={1}>
              <p>
                <strong>Sign up</strong> to CharityBay to buy or sell anything
                you no longer want or need.
              </p>
            </Slide>
            <Slide index={2}>
              <p>You can buy and sell items from a variety of categories.</p>
            </Slide>
            <Slide index={3}>
              <p>
                You can choose a charity that you would like the money to go to
                for each item you are selling.
              </p>
            </Slide>
            <Slide index={4}>
              <p>
                If you want to buy an item, you will be directed to the Just
                Giving donate page that was selected by the seller. Here you can
                donate the money for that item.
              </p>
            </Slide>
            <Slide index={5}>
              <p>
                Once you have made your donation, you will be taken back to
                CharityBay where you will need to confirm your purchase in order
                to alert the seller.
              </p>
            </Slide>
            <Slide index={6}>
              <p>
                Both the buyer and seller will receive email notifications with
                each other's contact details.
              </p>
            </Slide>
            <Slide index={7}>
              <p>
                The seller will arrange for the item to be delivered to the
                buyer.
              </p>
            </Slide>
            <Slide index={8}>
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
