import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import RestaurantFinder from "../api/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await RestaurantFinder.get(`/${id}`);
        console.log(data);
        setSelectedRestaurant(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">{selectedRestaurant.name}</h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.avg_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.reviews_count
                ? `(${selectedRestaurant.reviews_count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
