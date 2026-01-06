import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) return <Shimmer />;

  //  Restaurant Info
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  //  Menu Categories
  const menuCategories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>{cuisines?.join(", ")}</p>
      <p>{costForTwoMessage}</p>

      {menuCategories.map((category) => (
        <div key={category.card.card.title}>
          <h2>{category.card.card.title}</h2>

          {category.card.card.itemCards.map((item) => (
            <div key={item.card.info.id} className="menu-item">
              <h4>{item.card.info.name}</h4>
              <p>{item.card.info.description}</p>
              <p>
                ₹ {(item.card.info.price || item.card.info.defaultPrice) / 100}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
