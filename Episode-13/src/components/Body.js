import { useEffect, useState, useContext } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_LIST_API } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";

import { FaSearch, FaStar, FaFire } from "react-icons/fa";
import { MdWifiOff } from "react-icons/md";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { loggedInUser, setUserName } = useContext(UserContext);
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
        json?.data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.error(error);
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
      (res) => res.info.avgRating >= 4.6
    );
    setFilteredRestaurants(filtered);
  };

  const handleReset = () => {
    setFilteredRestaurants(listOfRestaurants);
    setSearchText("");
  };

  // 🌐 Offline UI
  if (!onlineStatus) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <MdWifiOff className="mb-4 text-7xl text-orange-500" />
        <h1 className="text-2xl font-bold">You’re Offline</h1>
        <p className="mt-1 text-gray-500">Check your internet connection</p>
      </div>
    );
  }

  // ⏳ Loading
  if (isLoading) return <Shimmer />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 🔥 HERO SECTION */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-white/70 backdrop-blur-md p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800">
            Discover food you’ll love 🍕
          </h1>
          <p className="mt-2 text-gray-500">
            Search restaurants, explore offers, enjoy your meal
          </p>

          {/* 🔍 SEARCH */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <div className="flex w-full items-center rounded-xl border border-gray-300 bg-white px-4 py-3 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-400 transition">
              <FaSearch className="text-gray-400" />
              <input
                className="ml-3 w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
                placeholder="Search restaurants..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <button
              disabled={!searchText.trim()}
              onClick={handleSearch}
              className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Search
            </button>
          </div>

          {/* 🎯 FILTERS */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={handleTopRated}
              className="flex items-center gap-2 rounded-full border border-orange-400 px-5 py-2 text-orange-500 transition hover:bg-orange-50"
            >
              <FaStar /> Top Rated
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-full border px-5 py-2 text-gray-600 transition hover:bg-gray-100"
            >
              Reset
            </button>

            <span className="flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 font-medium text-orange-600">
              <FaFire /> Trending
            </span>
          </div>

          {/* 👤 USER CONTEXT */}
          <div className="mt-6 flex items-center gap-3">
            <label className="font-medium text-gray-700">UserName:</label>
            <input
              type="text"
              className="w-64 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-400"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 🍽 RESTAURANT GRID */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        {filteredRestaurants.length === 0 ? (
          <div className="mt-20 text-center text-gray-500">
            <h2 className="text-xl font-semibold">No restaurants found 😔</h2>
            <p className="mt-1">Try searching something else</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        )}
      </div>
    </div>
  );
};

export default Body;
