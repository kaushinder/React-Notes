import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constant";
import { FaStar } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({ resData }) => {
  const info = resData?.info || resData;

  console.log("RestaurantCard Rendered:", resData);

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
    areaName,
    sla,
    totalRatingsString,
    feeDetails,
  } = info;

  return (
    <Link to={`/restaurants/${id}`}>
      <div className="group relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
        {/* 🖼 IMAGE */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={CDN_URL + cloudinaryImageId}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* ⭐ Rating */}
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-green-700 shadow">
            <FaStar className="text-[10px]" />
            {avgRating ?? "N/A"}
          </div>

          {/* 🏷 Discount */}
          {aggregatedDiscountInfoV3 && (
            <div className="absolute bottom-3 left-3 rounded-lg bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              {aggregatedDiscountInfoV3.header}
            </div>
          )}
        </div>

        {/* 📋 CONTENT */}
        <div className="relative p-4">
          {/* Veg / Non-Veg */}
          {veg !== undefined && (
            <span
              className={`absolute right-4 top-4 h-2.5 w-2.5 rounded-full ${
                veg ? "bg-green-600" : "bg-red-600"
              }`}
            />
          )}

          {/* Name */}
          <h5 className="truncate text-base font-semibold text-gray-800">
            {name}
          </h5>

          {/* Area */}
          {areaName && (
            <p className="mt-0.5 text-xs text-gray-400">📍 {areaName}</p>
          )}

          {/* Cuisines */}
          <p className="mt-1 truncate text-sm text-gray-500">
            {cuisines.join(", ")}
          </p>

          {/* Stats Row */}
          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              ⭐ {avgRating ?? "N/A"}
            </span>

            {sla?.deliveryTime && (
              <span className="flex items-center gap-1">
                ⏱ {sla.deliveryTime} min
              </span>
            )}

            {feeDetails?.distance && (
              <span className="flex items-center gap-1">
                🚚 {feeDetails.distance} km
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>{costForTwo}</span>
            {totalRatingsString && <span>{totalRatingsString}</span>}
          </div>

          {/* Hover CTA */}
          <div className="mt-3 flex justify-end">
            <span className="flex items-center gap-1 text-sm text-orange-500 opacity-0 transition group-hover:opacity-100">
              <MdRestaurantMenu /> View Menu
            </span>
          </div>

          {/* User */}
          <p className="mt-2 text-[10px] text-gray-400">User: {loggedInUser}</p>
        </div>
      </div>
    </Link>
  );
};

/* 🚀 PROMOTED HOC */
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => (
    <div className="relative">
      <span className="absolute left-3 top-3 z-10 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
        Featured
      </span>
      <RestaurantCard {...props} />
    </div>
  );
};

export default RestaurantCard;
