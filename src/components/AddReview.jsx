import React, { useContext, useState } from "react";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useHistory, useLocation, useParams } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("Rating");
  const history = useHistory();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await RestaurantFinder.post(`/${id}/add-review`, {
        name,
        review,
        rating,
      });
      history.push("/");
      history.push(location.pathname);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="custom-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            className="form-control"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
