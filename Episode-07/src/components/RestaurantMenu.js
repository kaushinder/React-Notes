import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { MENU_API_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(null);

  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API_URL + resId);

      // ⚠️ fetch DOES NOT fail automatically
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const text = await response.text();

      // 🚨 Swiggy often returns EMPTY response
      if (!text) {
        throw new Error("Empty response (API blocked)");
      }

      const json = JSON.parse(text);
      setResInfo(json.data);
    } catch (err) {
      console.error("Menu fetch failed:", err.message);
      setError("Menu not available right now");
    }
  };

  if (error) return <h2>{error}</h2>;
  if (!resInfo) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  const itemCards =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card?.itemCards || [];

  return (
    <div className="menu">
      <h1>{name}</h1>

      <p>
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>

      <h2>Menu</h2>

      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} – ₹
            {(item.card.info.price || item.card.info.defaultPrice) / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
