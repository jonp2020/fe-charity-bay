import React, { Component } from "react";
import { RegionDropdown } from "react-country-region-selector";
import Resizer from "react-image-file-resizer";
import axios from "axios";
class PostIems extends Component {
  state = {
    country: "United Kingdom",
    charity: "",
    region: "",
    category: "",
    file: null,
    thumbnailImage: {},
    fullsizeImage: {},
    imagesSent: false,
  };
  /**************************image handling **************************/
  resizeThumbnailFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        120,
        120,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  resizeFullSizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
    
  }
  /*********************************************** */

  selectRegion = (val) => {
    this.setState({ region: val });
  };
  handleCategory = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ category: value });
  };
  handleImage = (e) => {
    this.setState({ file: e.target.files });
  };
  handleCharity = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ charity: value });
  };
  handleSubmit = (e) => {
    const { country, charity, region, category, file } = this.state;
    // console.log(this.state);
    e.preventDefault();
    if (!file) {
      throw new Error("Select a file first!");
    }
    this.resizeThumbnailFile(file[0]).then((res) => {
      const thumbnailFile = this.dataURLtoFile(res, 'thumbImage.jpeg');
      const thumbnailForm = new FormData();
      thumbnailForm.append('file', thumbnailFile);

    })
    this.resizeFullSizeFile(file).then((res) => {
      const newFile2 = this.dataURLtoFile(res, 'fullImage.jpeg');
      const fullsizeForm = new FormData();
      fullsizeForm.append('file', newFile2); 
       this.setState({
            fullsizeImage: fullsizeForm,
          }); 
    })

  };
  render() {
;    return (
      <section>
        <h1>Post an Item</h1>
        <form onSubmit={this.handleSubmit}>
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
          <div className="row">
            <div className="col-25">
              <label for="charity">Charity</label>
            </div>
            <div className="col-75">
              <select id="charity" name="charity" onChange={this.handleCharity}>
                <option value="ageuk">Age UK</option>
                <option value="crisis">Crisis</option>
                <option value="women's aid">Women's Aid</option>
                <option value="british red cross<">British Red Cross</option>
                <option value="fareshare">FareShare</option>

                <option value="NHS charities together">
                  NHS Charities Together
                </option>
              </select>
            </div>
          </div>
          <button>Submit</button>
        </form>
      </section>
    );
  }
}
export default PostIems;
