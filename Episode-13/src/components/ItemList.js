import { CDN_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items, dummy }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item, index) => {
        const info = item.card.info;

        return (
          <div
            key={`${info.id}-${index}`} // ✅ FIX: unique key
            className="flex justify-between gap-4 p-4 border-b border-gray-200"
          >
            {/* LEFT: Item details */}
            <div className="w-9/12">
              <h2 className="font-semibold text-lg text-slate-700">
                {info.name}
              </h2>

              <p className="text-slate-600 font-medium mt-1">
                ₹ {(info.price || info.defaultPrice) / 100}
              </p>

              {info.description && (
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                  {info.description}
                </p>
              )}
            </div>

            {/* RIGHT: Image + ADD button */}
            <div className="w-3/12 flex justify-end">
              <div className="relative">
                {info.imageId ? (
                  <img
                    src={CDN_URL + info.imageId}
                    alt={info.name}
                    className="w-28 h-28 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}

                <button
                  onClick={() => handleAddItem(item)}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-green-600 font-semibold text-sm px-4 py-1 rounded shadow-md hover:bg-green-600 hover:text-white transition"
                >
                  ADD+
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
