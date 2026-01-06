import React from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {

  const { resId } = useParams();

   const resInfo = useRestaurantMenu(resId);


  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } = resInfo;

  return (
    <div className="menu">
      {/* Restaurant Info */}
      <h1>{name}</h1>
      <p>{cuisines.join(", ")}</p>
      <p>{costForTwoMessage}</p>

      {/* Menu */}
      {menuCategories.map((category) => (
        <div key={category.card.card.title}>
          <h2>{category.card.card.title}</h2>

          {category.card.card.itemCards.map((item) => (
            <div key={item.card.info.id} className="menu-item">
              <h4>{item.card.info.name}</h4>
              <p>{item.card.info.description}</p>
              <p>₹ {item.card.info.price / 100}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
