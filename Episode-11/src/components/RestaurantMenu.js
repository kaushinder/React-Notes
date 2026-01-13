import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (!resInfo) {
    return <h1 className="p-10 text-xl">Loading menu...</h1>;
  }

  //  Direct access (index-based)
  const restaurantInfo =
    resInfo?.cards?.[2]?.card?.card?.info;

  const categories =
    resInfo?.cards?.[4]
      ?.groupedCard
      ?.cardGroupMap
      ?.REGULAR
      ?.cards || [];

      console.log(categories);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Restaurant Header */}
      <h1 className="text-3xl font-bold">
        {restaurantInfo?.name}
      </h1>
      <p className="text-gray-500">
        {restaurantInfo?.cuisines?.join(", ")}
      </p>

      {/* Menu */}
      {categories.map((cat) => {
        // show only ItemCategory
        if (
          cat?.card?.card?.["@type"] !==
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) {
          return null;
        }

        return (
          <div
            key={cat.card.card.title}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold mb-4">
              {cat.card.card.title}
            </h2>

            {cat.card.card.itemCards.map((item) => {
              const info = item.card.info;

              return (
                <div
                  key={info.id}
                  className="mb-4 border-b pb-4"
                >
                  <h4 className="font-medium">
                    {info.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {info.description}
                  </p>

                  <p className="mt-1">
                    ₹ {(info.price || info.defaultPrice) / 100}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
