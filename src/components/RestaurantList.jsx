import React, { useContext, useEffect } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../api/RestaurantFinder";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const history = useHistory();

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const { data } = await RestaurantFinder.get("/");
        setRestaurants(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchRestaurants();
    // eslint-disable-next-line
  }, []);

  function renderRating(res) {
    if (res.reviews_count) {
      return (
        <>
          <StarRating rating={res.avg_rating} />
          <span className="text-warning ml-1">({res.reviews_count})</span>
        </>
      );
    } else {
      return "0 reviews";
    }
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((x) => (
            <tr key={x.id} onClick={() => history.push(`/restaurants/${x.id}`)}>
              <td>{x.name}</td>
              <td>{x.location}</td>
              <td>{"$".repeat(x.price_range)}</td>
              <td>{renderRating(x)}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/restaurants/${x.id}/update`);
                  }}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={async (e) => {
                    e.stopPropagation();

                    try {
                      await RestaurantFinder.delete(`/${x.id}`);
                      setRestaurants(restaurants.filter((y) => y.id !== x.id));
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
