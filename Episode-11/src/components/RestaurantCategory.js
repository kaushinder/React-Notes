import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ category }) => {
  // console.log(category);

  const [showItems, setShowItems] = useState(false);

  const handleClick = () => {
    setShowItems(!showItems);
    // console.log("Clicked on category:", category.card.card.title);
  };
  return (
    <div>
      {/* Category Accordion */}
      {/* Header */}
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {category.card.card.title} ({category.card.card.itemCards?.length})
          </span>
          <span>⬇️</span>
        </div>

        {/* Accordian Body */}

        {showItems && <ItemList items={category.card.card.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
