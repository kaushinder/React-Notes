import { CDN_URL } from "../utils/constant";

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item) => {
        const info = item.card.info;

        return (
          <div
            key={info.id}
            className="border-b border-gray-200 p-3 m-2 flex justify-between gap-4"
          >
            {/* LEFT: Text */}
            <div className="flex-1">
              <p className="font-bold text-base">{info.name}</p>

              <p className="text-sm font-semibold mt-1">
                ₹ {(info.price || info.defaultPrice) / 100}
              </p>

              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                {info.description ||
                  "Delicious and freshly prepared item with rich flavors and quality ingredients."}
              </p>
            </div>

            {/* RIGHT: Image with ADD button on top */}
            {info.imageId && (
              <div className="relative">
                <img
                  src={CDN_URL + info.imageId}
                  alt={info.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <button className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-white text-orange-500 border border-orange-500 text-xs px-3 py-1 rounded font-semibold hover:bg-orange-500 hover:text-white transition">
                  ADD
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
