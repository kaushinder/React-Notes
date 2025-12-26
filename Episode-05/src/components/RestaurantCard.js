import { CDN_URL } from "../utils/constants.js";

const RestaurantCard = (props) => {
  const {resData} = props;
  const {cloudinaryImageId, name, cuisines, avgRating, costForTwo, deliveryTime} = resData?.data;
  return (
      <div className="res-card">
        <img className="res-logo" alt="res-logo" src={CDN_URL+cloudinaryImageId}/>
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} stars</h4>
        <h4>Rs. {costForTwo/100} for Two</h4>
        <h5>{deliveryTime} minutes</h5>
      </div>
  )
};

export default RestaurantCard;