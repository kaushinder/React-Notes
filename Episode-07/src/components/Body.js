import RestaurantCard from "./RestaurantCard.js";
import {useEffect,useState} from "react";
import Shimmer from "./Shimmer.js";

const Body = () => {

// Local State Variable - super powerful variable
const [listOfRestaurants, setListOfRestaurants] = useState([]); 
const [filteredRestaurants, setFilteredRestaurants] = useState([]);

const [searchText, setSearchText] = useState("");

// whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
console.log("Body rendered");

useEffect(() => {
  fetchData();
}, []);


 const fetchData = async () => {
  const data = await fetch(
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=29.0219927&lng=77.7709558&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
  );

  const json = await data.json();
 

setListOfRestaurants(
    // optional chaining
    json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || 
    restaurantList
  );

setFilteredRestaurants(
    // optional chaining
    json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || 
    restaurantList
  );

};

// Conditional renedering - ternary operator

  return listOfRestaurants.length == 0 ? <Shimmer/> : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input className="search-box" type="text" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
          <button onClick={() => {
            // filter the restaurant cards and update the ui
            // search text
            console.log(searchText);

            const filteredRestaurant = listOfRestaurants.filter((res) => 
  res.info.name.toLowerCase().includes(searchText.toLowerCase())
);

           setFilteredRestaurants(filteredRestaurant);
            
          }}>Search</button>
        </div>
        <button
  className="filter-btn"
  onClick={() => {
  const filteredList = listOfRestaurants.filter(
    (res) => parseFloat(res?.info?.avgRating) > 4
  );

 
setFilteredRestaurants(filteredList);
}}
>
  Top Rated Restaurants
</button>

      </div>
      <div className="res-container">
        {
          filteredRestaurants.map((restaurant, index) => (
            <RestaurantCard resData={restaurant} key={restaurant?.info?.id || index}/>
          ))}
      </div>
    </div>
  );
};

export default Body;