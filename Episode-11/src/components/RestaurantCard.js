import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constant";
import { FaStar, FaLeaf } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({ resData }) => {
  const info = resData?.info || resData;

const { loggedInUser } = useContext(UserContext);

  if (!info) return null;

  const {
    id,
    name,
    cuisines = [],
    avgRating,
    costForTwo,
    cloudinaryImageId,
    aggregatedDiscountInfoV3,
    veg,
  } = info;

  return (
    <Link to={`/restaurants/${id}`}>
      <div className="group relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
        {/* 🌈 Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-orange-200/30 via-transparent to-pink-200/30" />

        {/* 🖼 IMAGE */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={CDN_URL + cloudinaryImageId}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* ⭐ Rating Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-green-700 shadow">
            <FaStar className="text-xs" />
            {avgRating ?? "N/A"}
          </div>

          {/* 🏷 Discount */}
          {aggregatedDiscountInfoV3 && (
            <div className="absolute bottom-3 left-3 rounded-xl bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-md">
              {aggregatedDiscountInfoV3.header}
            </div>
          )}
        </div>

        {/* 📋 CONTENT */}
        <div className="relative p-4">
          {/* Veg / Non-Veg */}
          {veg !== undefined && (
            <span
              className={`absolute right-4 top-4 h-3 w-3 rounded-full ${
                veg ? "bg-green-600" : "bg-red-600"
              }`}
            />
          )}

          <h3 className="truncate text-lg font-bold text-gray-800">{name}</h3>
          <h4>User: {loggedInUser}</h4>

          <p className="mt-1 truncate text-sm text-gray-500">
            {cuisines.join(", ")}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              {costForTwo}
            </span>

            <span className="flex items-center gap-1 text-sm text-orange-500 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              <MdRestaurantMenu /> View Menu
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Higher Order Component for Promoted Restaurant Card
//

/* 🚀 PROMOTED HOC */
export const withPromotedLabel =(RestaurantCard) => {
  return (props) => (
    <div className="relative">
      <span className="absolute -top-3 left-4 z-20 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-4 py-1 text-xs font-bold tracking-wide text-white shadow-lg">
        FEATURED
      </span>
      <RestaurantCard {...props} />
    </div>
  );
};

export default RestaurantCard;
