import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_LIST_API } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";

// Icons
import { FaSearch, FaStar } from "react-icons/fa";
import { MdWifiOff } from "react-icons/md";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true); // ✅ LOADING STATE

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true); // ✅ START SHIMMER

      const response = await fetch(RESTAURANT_LIST_API);
      const json = await response.json();

      // ⏳ simulate slow API (remove later)
      // await new Promise((res) => setTimeout(res, 2000));

      const restaurants =
        json?.data?.data?.cards[1]?.card?.card?.gridElements
          ?.infoWithStyle?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (err) {
      console.error("Restaurant fetch failed", err);
    } finally {
      setIsLoading(false); // ✅ STOP SHIMMER
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

  const onlineStatus = useOnlineStatus();

  // 🌐 OFFLINE UI
  if (!onlineStatus) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <MdWifiOff className="mb-4 text-7xl text-orange-500" />
        <h1 className="text-3xl font-bold">You are Offline</h1>
        <p className="mt-2 text-gray-600">
          Please check your internet connection
        </p>
      </div>
    );
  }

  // ⏳ SHIMMER UI
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Shimmer />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* 🔍 Search & Filters */}
      <div className="mb-10 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex w-full items-center rounded-xl border px-4 py-3 sm:w-96">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="ml-3 w-full outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600"
          >
            <FaSearch /> Search
          </button>

          <button
            onClick={handleTopRated}
            className="flex items-center gap-2 rounded-xl border border-orange-500 px-6 py-3 text-orange-500 transition hover:bg-orange-50"
          >
            <FaStar /> Top Rated
          </button>
        </div>
      </div>

      {/* 🍽 RESTAURANT GRID */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
