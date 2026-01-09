import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("About - constructor");
  }

  componentDidMount() {
    console.log("About - componentDidMount");
  }

  render() {
    console.log("About - render");

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Header Section */}
          <div className="mb-10 rounded-3xl bg-white p-8 shadow-xl">
            <h1 className="mb-4 text-4xl font-extrabold text-gray-800">
              About This Project 🚀
            </h1>

            <p className="text-lg text-gray-600">
              This application is built while learning the{" "}
              <span className="font-semibold text-orange-500">
                Namaste React
              </span>{" "}
              series. It focuses on understanding React fundamentals,
              real-world patterns, and modern UI development.
            </p>
          </div>

          {/* User / Developer Info */}
          <div className="mb-10 rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Developer Information 👨‍💻
            </h2>

            <UserClass name={"Kaushinder Singh Raghav"} location={"Noida"} />
          </div>

          {/* Skills / Highlights */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
              <h3 className="mb-2 text-xl font-semibold text-orange-600">
                React Concepts
              </h3>
              <p className="text-sm text-gray-600">
                Functional & Class Components, props, state, hooks,
                lifecycle methods.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
              <h3 className="mb-2 text-xl font-semibold text-orange-600">
                Modern Styling
              </h3>
              <p className="text-sm text-gray-600">
                Tailwind CSS for responsive, clean, and scalable UI.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
              <h3 className="mb-2 text-xl font-semibold text-orange-600">
                Real-World APIs
              </h3>
              <p className="text-sm text-gray-600">
                Live API integration, shimmer loading, error handling.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-sm text-gray-600">
            Built with ❤️ using React & Tailwind CSS
          </div>
        </div>
      </div>
    );
  }
}

export default About;
