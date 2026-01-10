import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ resData }) => {
  // ✅ SUPPORT BOTH DATA SHAPES
  const info = resData?.info || resData;

  if (!info) return null;

  const {
    id,
    name,
    cuisines = [],
    avgRating,
    costForTwo,
    cloudinaryImageId,
  } = info;

  return (
    <Link to={`/restaurants/${id}`}>
      <div className="w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 cursor-pointer">
        
        {cloudinaryImageId && (
          <img
            className="w-full h-40 object-cover rounded-xl mb-3"
            src={CDN_URL + cloudinaryImageId}
            alt={name}
          />
        )}

        <h3 className="font-bold text-lg truncate">{name}</h3>

        <p className="text-gray-500 text-sm truncate">
          {cuisines.join(", ")}
        </p>

        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-semibold">
            ⭐ {avgRating ?? "N/A"}
          </span>

          <span className="text-gray-600">{costForTwo}</span>
        </div>
      </div>
    </Link>
  );
};


// Higher order component (HOC) - Example

// input - RestaurantCard  => output - withPromotedLabel(RestaurantCard)


export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-2 left-2 z-10 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-bold">
          PROMOTED
        </label>

        <RestaurantCard {...props} />
      </div>
    );
  };
};


export default RestaurantCard;
