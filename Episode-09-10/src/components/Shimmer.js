const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array(20)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="h-[320px] rounded-2xl bg-gray-200 p-4 animate-pulse"
          >
            <div className="h-40 w-full rounded-xl bg-gray-300 mb-4"></div>
            <div className="h-4 w-3/4 rounded bg-gray-300 mb-2"></div>
            <div className="h-4 w-full rounded bg-gray-300 mb-2"></div>
            <div className="h-4 w-1/2 rounded bg-gray-300"></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
