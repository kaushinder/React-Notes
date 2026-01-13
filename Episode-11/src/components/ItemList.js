const ItemList = (items) => {
  return (
    <div>
          {items.items.map((item) => (
            <div key={item.card.info.id} className="border-b p-4">
              <h3 className="font-bold">{item.card.info.name}</h3>
              <p className="text-gray-500">{item.card.info.description}</p>
              <p className="text-sm font-semibold">
                Price: ₹
                {(item.card.info.price || item.card.info.defaultPrice) / 100}
              </p>
            </div>
          ))}
    </div>
  );
};

export default ItemList;
