import { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_LIST_API } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";

import { FaSearch, FaStar } from "react-icons/fa";
import { MdWifiOff } from "react-icons/md";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const RestaurantCardWithPromoted = withPromotedLabel(RestaurantCard);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(RESTAURANT_LIST_API);
      const json = await res.json();

      const restaurants =
        json?.data?.data?.cards?.[1]?.card?.card?.gridElements
          ?.infoWithStyle?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (err) {
      console.error("Restaurant fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const handleTopRated = () => {
    const filtered = listOfRestaurants.filter(
      (res) => res.info.avgRating >= 4.5
    );
    setFilteredRestaurants(filtered);
  };

  if (!onlineStatus) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center">
        <MdWifiOff className="text-6xl text-orange-500" />
        <h1 className="mt-4 text-xl font-bold">You are Offline</h1>
      </div>
    );
  }

  if (isLoading) return <Shimmer />;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex gap-4">
        <input
          className="border p-2 rounded-md"
          placeholder="Search restaurant"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch} className="btn">
          <FaSearch />
        </button>
        <button onClick={handleTopRated} className="btn">
          <FaStar /> Top Rated
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filteredRestaurants.map((restaurant) =>
          restaurant.info.aggregatedDiscountInfoV3 ? (
            <RestaurantCardWithPromoted
              key={restaurant.info.id}
              resData={restaurant}
            />
          ) : (
            <RestaurantCard
              key={restaurant.info.id}
              resData={restaurant}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Body;
