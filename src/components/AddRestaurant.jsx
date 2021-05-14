import React, { useContext, useState } from "react";
import RestaurantFinder from "../api/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      setName("");
      setLocation("");
      setPriceRange("Price Range");
      setRestaurants([...restaurants, data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="col">
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col">
            <select
              className="custom-select my-1 mr-sm-2"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
