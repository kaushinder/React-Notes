import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);


  const [showIndex, setShowIndex] = useState(null);

  if (!resInfo) return <h1 className="p-10">Loading...</h1>;

  // Restaurant info (index-based)
  const restaurantInfo = resInfo?.cards?.[2]?.card?.card?.info;

  // 1️⃣ Raw categories (no filter here)
  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  // 2️⃣ Apply filter on categories variable
  const itemCategories = categories.filter(
    (category) =>
      category?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  // console.log(itemCategories);

  return (
    <div className="text-center max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{restaurantInfo?.name}</h1>
      <p className="text-gray-500 font-bold">
        {restaurantInfo?.cuisines?.join(", ")}
      </p>

      {/* Categories Accordian */}
      {itemCategories.map((category, index) => (
        // controlled Components
        <RestaurantCategory
          key={category.card.card.title}
          category={category}
          showItems={index === 1 ? true : false}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
