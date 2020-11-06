import React, { Component } from "react";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
class PostIems extends Component {
  state = { country: "United Kingdom", region: "", category: "", image: null };

  selectRegion = (val) => {
    this.setState({ region: val });
  };
  handleCategory = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ category: value });
  };
  handleImage = (e) => {
    e.preventDefault();

    this.setState({ image: e.target.files[0] });
  };
  render() {
    return (
      <section>
        <h1>Post an Item</h1>
        <form>
          <div className="row">
            <div className="col-25">
              <label htmlFor="title">Title</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Item Name"
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="descp">Description</label>
            </div>
            <div className="col-75">
              <textarea
                id="descp"
                name="descp"
                placeholder="Write about your item.."
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="image">Picture</label>
            </div>
            <div className="col-75">
              <input
                type="file"
                id="image"
                name="image"
                onChange={this.handleImage}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="category">Category</label>
            </div>
            <div className="col-75">
              <select
                id="category"
                name="category"
                onChange={this.handleCategory}
              >
                <option value="electronic">Electronic</option>
                <option value="toys">Toys</option>
                <option value="garden">Garden</option>
                <option value="toys">Toys</option>
                <option value="kitchenware">Kitchenware</option>

                <option value="books">Books</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="location">Location</label>
            </div>

            <div className="col-75">
              <RegionDropdown
                id="location"
                country={this.state.country}
                value={this.state.region}
                onChange={(val) => this.selectRegion(val)}
              />
            </div>
          </div>
          <div className="item-charity">
            <div>
              <input type="radio" id="ageuk" name="ageuk" value="Age UK" />
              <label htmlFor="ageuk">Age UK</label>
            </div>
            <div>
              <input type="radio" id="crisis" name="crisis" value="crisis" />
              <label htmlFor="crisis">Crisis</label>
            </div>
          </div>
          <div className="item-charity-2">
            <div>
              <input
                type="radio"
                id="redcross"
                name="redcross"
                value="British Red Cross"
              />
              <label htmlFor="male">British Red Cross</label>
            </div>
            <div>
              <input
                type="radio"
                id="womenaid"
                name="womenaid"
                value="women's aid"
              />
              <label htmlFor="male">women's aid</label>
            </div>
          </div>
          <div className="item-charity-2">
            <div>
              <input
                type="radio"
                id="faresahre"
                name="faresahre"
                value="FareShare"
              />
              <label htmlFor="faresahre">FareShare</label>
              <br></br>
            </div>
            <div>
              <input type="radio" id="nhs" name="nhs" value="nhs" />
              <label htmlFor="nhs">NHS Charities Together</label>
            </div>
          </div>

          <button className="donate-btn">Click to buy and donate</button>
        </form>
      </section>
    );
  }
}
export default PostIems;
