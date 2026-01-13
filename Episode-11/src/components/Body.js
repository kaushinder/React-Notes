import { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_LIST_API } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";

import { FaSearch, FaStar, FaFire } from "react-icons/fa";
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
        json?.data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (err) {
      console.error(err);
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
    setFilteredRestaurants(
      listOfRestaurants.filter((res) => res.info.avgRating >= 4.5)
    );
  };

  const handleReset = () => {
    setFilteredRestaurants(listOfRestaurants);
    setSearchText("");
  };

  // 🌐 Offline
  if (!onlineStatus) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <MdWifiOff className="text-7xl text-orange-500 mb-4" />
        <h1 className="text-2xl font-bold">You’re Offline</h1>
        <p className="text-gray-500 mt-1">Check your internet connection</p>
      </div>
    );
  }

  // ⏳ Loading
  if (isLoading) return <Shimmer />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 🔥 HERO SEARCH */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-white/70 backdrop-blur-md p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-gray-800">
            Discover food you’ll love 🍕
          </h1>
          <p className="mt-2 text-gray-500">
            Search restaurants, explore offers, enjoy your meal
          </p>

          {/* Search */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center w-full border rounded-xl px-4 py-3 bg-white">
              <FaSearch className="text-gray-400" />
              <input
                className="ml-3 w-full outline-none text-sm"
                placeholder="Search restaurants..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <button
              onClick={handleSearch}
              className="rounded-xl bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 transition"
            >
              Search
            </button>
          </div>

          {/* 🎯 FILTER CHIPS */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleTopRated}
              className="flex items-center gap-2 rounded-full border border-orange-400 px-5 py-2 text-orange-500 hover:bg-orange-50 transition"
            >
              <FaStar /> Top Rated
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-full border px-5 py-2 text-gray-600 hover:bg-gray-100 transition"
            >
              Reset
            </button>

            <span className="flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-orange-600 font-medium">
              <FaFire /> Trending
            </span>
          </div>
        </div>
      </div>

      {/*  RESTAURANT GRID */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <h2 className="text-xl font-semibold">No restaurants found 😔</h2>
            <p className="mt-1">Try searching something else</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredRestaurants.map((restaurant) =>
              restaurant.info.aggregatedDiscountInfoV3 ? (
                <RestaurantCardWithPromoted
                  key={restaurant.info.id}
                  resData={restaurant}
                />
              ) : (
                <RestaurantCard key={restaurant.info.id} resData={restaurant} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
