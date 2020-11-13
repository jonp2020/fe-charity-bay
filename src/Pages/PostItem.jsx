import React, { useState, useRef } from "react";
import { RegionDropdown } from "react-country-region-selector";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { navigate } from "@reach/router";

export default function PostItem() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const charityRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef();
  const { currentUser } = useAuth();

  function resizeThumbnailFile(file) {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        120,
        120,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  }
  function resizeFullSizeFile(file) {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  }
  function dataURLtoFile(dataurl, filename) {
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

  function selectRegion(val) {
    setLocation(val);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const file = fileRef.current.files;
    if (!file) {
      throw new Error("Select a file first!");
    }

    return Promise.all([
      resizeThumbnailFile(file[0]),
      resizeFullSizeFile(file[0]),
    ]).then(([thumbnailRes, fullsizeRes]) => {
      const thumbnailFile = dataURLtoFile(thumbnailRes, "thumbImage.jpeg");
      const fullsizeFile = dataURLtoFile(fullsizeRes, "fullImage.jpeg");
      const thumbnailForm = new FormData();
      const fullsizeForm = new FormData();
      thumbnailForm.append("file", thumbnailFile);
      fullsizeForm.append("file", fullsizeFile);
      return Promise.all([
        axios.post(
          "https://charity-bay-be.herokuapp.com/api/image",
          thumbnailForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        axios.post(
          "https://charity-bay-be.herokuapp.com/api/image",
          fullsizeForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        axios.get(
          `https://charity-bay-be.herokuapp.com/api/users/user/${currentUser.email}`
        ),
      ])
        .then(([thumbnailImage, fullsizeImage, user]) => {
          const thumbnail_img_ref = thumbnailImage.data.image.key;
          const fullsize_img_ref = fullsizeImage.data.image.key;
          const seller_username = user.data.user.username;
          return axios.post("https://charity-bay-be.herokuapp.com/api/items", {
            thumbnail_img_ref,
            fullsize_img_ref,
            seller_username,
            charity_id: parseInt(charityRef.current.value),
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            location,
            price: parseInt(priceRef.current.value),
          });
        })
        .then(
          ({
            data: {
              item: { item_id },
            },
          }) => {
            setLoading(false);
            navigate(`/item/${item_id}`);
          }
        );
    });
  }

  return (
    <section>
      <h1 className="post-item-header">
        Complete the form to add your item to{" "}
        <span className="lobster-font">CharityBay</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="title">Title</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Item name"
              required
              ref={titleRef}
              className="post-item-select-menu"
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
              placeholder="Write a short description of your item..."
              required
              ref={descriptionRef}
              className="post-item-select-menu"
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="category">Category</label>
          </div>
          <div className="col-75">
            <select
              id="category"
              name="category"
              required
              ref={categoryRef}
              className="post-item-select-menu"
            >
              <option value="Electronics">Electronic</option>
              <option value="Toys">Toys</option>
              <option value="Garden">Garden</option>
              <option value="Clothes">Clothes</option>
              <option value="Kitchenware">Kitchenware</option>
              <option value="Books">Books</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label htmlFor="location">Location</label>
          </div>

          <div className="col-75">
            <RegionDropdown
              className="post-item-select-menu"
              id="location"
              country={"United Kingdom"}
              value={location}
              required
              onChange={(val) => selectRegion(val)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="charity">Charity</label>
          </div>
          <div className="col-75">
            <select
              className="post-item-select-menu"
              id="charity"
              name="charity"
              required
              ref={charityRef}
            >
              <option value="1">Age UK</option>
              <option value="2">Crisis</option>
              <option value="3<">British Red Cross</option>
              <option value="4">Women's Aid</option>
              <option value="5">FareShare</option>
              <option value="6">NHS Charities Together</option>
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
              placeholder="Item price"
              required
              ref={priceRef}
              className="post-item-select-menu"
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="image">Picture</label>
          </div>
          <div className="col-75">
            <input
              className="custom-file-input"
              type="file"
              id="image"
              name="image"
              required
              ref={fileRef}
              accept="image/jpeg,image/x-png,image/gif"
            />
          </div>
        </div>
        <button className="sign-up-login-btn" disabled={loading}>
          Submit
        </button>
      </form>
    </section>
  );
}
