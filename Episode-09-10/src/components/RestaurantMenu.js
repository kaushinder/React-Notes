import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  // ⏳ MENU SHIMMER (Tailwind)
  const MenuShimmer = () => (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {Array(10)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="mb-4 h-6 w-full rounded bg-gray-300 animate-pulse"
          ></div>
        ))}
    </div>
  );

  // ⏳ Loading state
  if (!resInfo) return <MenuShimmer />;

  // 🍽 Restaurant Info
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info || {};

  // 📋 Menu Categories
  const menuCategories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* 🏪 Restaurant Header */}
      <div className="mb-8 rounded-2xl bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <p className="mt-2 text-gray-600">{cuisines?.join(", ")}</p>
        <p className="mt-1 text-sm text-gray-500">{costForTwoMessage}</p>
      </div>

      {/* 📖 Menu */}
      {menuCategories.map((category) => (
        <div key={category.card.card.title} className="mb-8">
          <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-800">
            {category.card.card.title}
          </h2>

          <div className="space-y-6">
            {category.card.card.itemCards.map((item) => {
              const info = item.card.info;

              return (
                <div
                  key={info.id}
                  className="flex justify-between gap-6 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {info.name}
                    </h4>

                    {info.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {info.description}
                      </p>
                    )}

                    <p className="mt-2 font-medium text-gray-700">
                      ₹ {(info.price || info.defaultPrice) / 100}
                    </p>
                  </div>

                  {/* Optional image space (future-proof) */}
                  {info.imageId && (
                    <img
                      className="h-24 w-24 rounded-lg object-cover"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.imageId}`}
                      alt={info.name}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
