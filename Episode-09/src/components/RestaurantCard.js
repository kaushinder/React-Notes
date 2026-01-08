import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ resData }) => {
  const { id, name, cuisines, avgRating, costForTwo, cloudinaryImageId } =
    resData.info;

  return (
    <Link to={`/restaurants/${id}`}>
      <div className="w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 cursor-pointer">
        
        <img
          className="w-full h-40 object-cover rounded-xl mb-3"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          onError={(e) => (e.target.style.display = "none")}
        />

        <h3 className="font-bold text-lg truncate">{name}</h3>

        <p className="text-gray-500 text-sm truncate">
          {cuisines.join(", ")}
        </p>

        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md font-semibold">
            ⭐ {avgRating}
          </span>

          <span className="text-gray-600">{costForTwo}</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
