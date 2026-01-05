import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_API } from "../utils/constant";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const [resInfo, setResInfo] = useState(null);
  const [menuCategories, setMenuCategories] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API + resId);
      const json = await response.json();

      // 🔹 Restaurant basic info
      const restaurantInfo =
        json?.data?.cards[2]?.card?.card?.info;

      // 🔹 Menu categories (Recommended, Beverages, etc.)
      const categories =
        json?.data?.cards[4]?.groupedCard?.cardGroupMap
          ?.REGULAR?.cards.filter(
            (c) =>
              c.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          );

      setResInfo(restaurantInfo);
      setMenuCategories(categories);

    } catch (err) {
      console.error("Menu fetch failed:", err);
    }
  };

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
