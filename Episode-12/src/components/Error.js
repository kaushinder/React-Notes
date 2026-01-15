import { useRouteError, Link } from "react-router-dom";
import { MdErrorOutline, MdHome } from "react-icons/md";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-6 text-center">
      
      {/* Icon */}
      <div className="mb-6 rounded-full bg-white p-6 shadow-lg">
        <MdErrorOutline className="text-7xl text-orange-500" />
      </div>

      {/* Error Code */}
      <h1 className="text-4xl font-bold text-gray-800">
        Oops!
      </h1>

      <p className="mt-2 text-lg text-gray-600">
        Something went wrong
      </p>

      {/* Error Details */}
      <p className="mt-4 rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow">
        {err?.status} : {err?.statusText || "Unexpected Error"}
      </p>

      {/* Action Button */}
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-white shadow-md transition hover:scale-105 hover:bg-orange-600"
      >
        <MdHome className="text-xl" />
        Go Back Home
      </Link>

      {/* Footer Text */}
      <p className="mt-10 text-sm text-gray-500">
        © 2026 FoodVilla • Built with ❤️ using React
      </p>
    </div>
  );
};

export default Error;
