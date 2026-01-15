const Grocery = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Page Heading */}
      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        Grocery Store 🛒
      </h1>

      <p className="mb-8 text-gray-600">
        Welcome to our online grocery store. We have a lot of components
        and features coming soon!
      </p>

      {/* Grocery Categories */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {[
          "Vegetables",
          "Fruits",
          "Dairy Products",
          "Snacks",
          "Beverages",
          "Household Items",
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg"
          >
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              {item}
            </h3>
            <p className="text-sm text-gray-600">
              Fresh and high-quality {item.toLowerCase()} available here.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grocery;
