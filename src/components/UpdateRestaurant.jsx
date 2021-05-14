import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import RestaurantFinder from "../api/RestaurantFinder";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [priceRange, setPriceRange] = useState();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await RestaurantFinder.get(`/${id}`);
        setName(data.name);
        setLocation(data.location);
        setPriceRange(data.price_range);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
    // eslint-disable-next-line
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await RestaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      history.push("/");
    } catch (error) {}
  }

  return (
    <div>
      <h1>{name}</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            type="number"
            id="price_range"
            className="form-control"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
