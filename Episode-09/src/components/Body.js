import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_LIST_API } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(RESTAURANT_LIST_API);
      const json = await response.json();

      const restaurants =
        json?.data?.data?.cards[1]?.card?.card?.gridElements
          ?.infoWithStyle?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (err) {
      console.error("Restaurant fetch failed", err);
    }
  };

  //  SEARCH
  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  //  TOP RATED
  const handleTopRated = () => {
    const filtered = listOfRestaurants.filter(
      (res) => res.info.avgRating >= 4.5
    );
    setFilteredRestaurants(filtered);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
    <h1>🔴 You are offline! Please check your internet connection.</h1>
  );
  }



  return listOfRestaurants.length === 0 ? ( <Shimmer /> ) :  (
    <div className="body">
      {/*  SEARCH + FILTER */}
      <div className="filter">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

        <button onClick={handleTopRated}>
          ⭐ Top Rated Restaurants
        </button>
      </div>

      {/*  RESTAURANT LIST */}
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.info.id}
            resData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
