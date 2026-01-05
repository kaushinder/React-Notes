import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constant";

const RestaurantCard = ({ resData }) => {
  const { id, name, cuisines, avgRating, costForTwo, cloudinaryImageId } =
    resData.info;

  return (
    <Link to={`/restaurants/${id}`}>
      <div className="res-card">
        <img
          className="res-logo"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          onError={(e) => (e.target.style.display = "none")}
        />

        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} ⭐</h4>
        <h4>{costForTwo}</h4>
      </div>
    </Link>
  );
};

export default RestaurantCard;
