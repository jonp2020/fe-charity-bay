import React, { Component } from 'react';
import { RegionDropdown } from 'react-country-region-selector';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';

class PostItem extends Component {
  state = {
    country: 'United Kingdom',
    charity: '',
    region: '',
    category: '',
    price: 0,
    title: '',
    description: '',
    file: null,
    // thumbnailImage: {},
    // fullsizeImage: {},
    // imagesSent: false,
  };
  /**************************image handling **************************/
  resizeThumbnailFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        120,
        120,
        'JPEG',
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });
  resizeFullSizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
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
    const { value } = e.target;
    this.setState({ category: value });
  };
  handleImage = (e) => {
    this.setState({ file: e.target.files });
  };
  handleCharity = (e) => {
    const { value } = e.target;
    this.setState({ charity: value });
  };
  handlePrice = (e) => {
    const { value } = e.target;
    this.setState({ price: value });
  };
  handleTitle = (e) => {
    const { value } = e.target;
    this.setState({ title: value });
  };
  handleDescription = (e) => {
    const { value } = e.target;
    this.setState({ description: value });
  };

  handleSubmit = (e) => {
    console.log(this.state);
    const { file } = this.state;
    e.preventDefault();
    if (!file) {
      throw new Error('Select a file first!');
    }
    return Promise.all([
      this.resizeThumbnailFile(file[0]),
      this.resizeFullSizeFile(file[0]),
    ]).then(([thumbnailRes, fullsizeRes]) => {
      const thumbnailFile = this.dataURLtoFile(thumbnailRes, 'thumbImage.jpeg');
      const fullsizeFile = this.dataURLtoFile(fullsizeRes, 'fullImage.jpeg');
      const thumbnailForm = new FormData();
      const fullsizeForm = new FormData();
      thumbnailForm.append('file', thumbnailFile);
      fullsizeForm.append('file', fullsizeFile);
      return Promise.all([
        axios.post('http://localhost:9090/api/image', thumbnailForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
        axios.post('http://localhost:9090/api/image', fullsizeForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }),
      ]).then(([thumbnailImage, fullsizeImage]) => {
        return Promise.all([thumbnailImage, fullsizeImage]);
      });
    });
  };

  // {
  //     "thumbnail_img_ref": "Saturn_test_2.jpg",
  //     "fullsize_img_ref": "earth-pic.jpg",
  //     "title": "Digifad",
  //     "description": "Ut sit do sint in tempor pariatur cupidatat ipsum elit. Deserunt minim consequat amet tempor minim laborum laborum dolore officia. Culpa eu aute laboris non anim minim tempor labore elit ex fugiat id proident. Quis nulla excepteur consectetur elit laborum officia officia. Ex officia in exercitation dolore magna ullamco duis et mollit irure aliqua minim. Irure ipsum reprehenderit magna culpa est nisi ad adipisicing dolore elit consequat adipisicing sint enim.",
  //     "price": 6,
  //     "category": "Toys",
  //     "status": "available",
  //     "seller_username": "Lois James",
  //     "charity_id": 1,
  //     "location": "stockport"
  //   },

  render() {
    return (
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
                onChange={this.handleTitle}
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
                onChange={this.handleDescription}
              ></textarea>
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
          <div className="row">
            <div className="col-25">
              <label htmlFor="price">Price</label>
            </div>
            <div className="col-75">
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Item Price"
                onChange={this.handlePrice}
              ></input>
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
          <button>Submit</button>
        </form>
      </section>
    );
  }
}
export default PostItem;
