import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantsContext } from "./context/RestaurantsContext";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/restaurants/:id"
              component={RestaurantDetailPage}
            />
            <Route
              exact
              path="/restaurants/:id/update"
              component={UpdatePage}
            />
          </Switch>
        </Router>
      </div>
    </RestaurantsContext.Provider>
  );
};

export default App;
