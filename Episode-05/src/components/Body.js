import RestaurantCard from "./RestaurantCard.js";
import {useState} from "react";
import restaurantList from "../utils/mockData.js";

const Body = () => {

// Local State Variable - super powerful variable
const [listOfRestaurants, setListOfRestaurants] = useState(restaurantList); 

// // Normal Js variable
// let listOfRestaurants = [];


  return (
    <div className="body">
      <div className="filter">
        <button
  className="filter-btn"
  onClick={() => {
  // Convert rating to number so comparison works
  const filteredList = listOfRestaurants.filter(
    (res) => parseFloat(res.data.avgRating) > 4
  );

 
  setListOfRestaurants(filteredList);
}}
>
  Top Rated Restaurants
</button>

      </div>
      <div className="res-container">
        {
          listOfRestaurants.map((restaurant, index) => (
            <RestaurantCard resData={restaurant} key={restaurant.data.id}/>
          ))}
      </div>
    </div>
  );
};

export default Body;