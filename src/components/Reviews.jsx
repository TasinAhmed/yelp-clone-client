import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews.map((x) => (
        <div
          key={x.id}
          className="card text-white bg-primary mb-3 mr-4"
          style={{ maxWidth: "30%", width: "100%" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>{x.name}</span>
            <span>
              <StarRating rating={x.rating} />
            </span>
          </div>
          <div className="card-body">
            <p className="card-text">{x.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
