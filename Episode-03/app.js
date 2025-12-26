import React from "react";
import ReactDOM from "react-dom/client";


// React Element
const title = (
  <h1 className="head" tabIndex="5">
    Namaste React using JSX
  </h1>
);


//  React Functional Component

const Title = () => (
  <h1 className="head" tabIndex="5">
    React Series - Episode 3
  </h1>
);

// Component composition
const HeadingComponent = () => (
  <div id="container">
    <Title /> 
    {title}
    <h1 className="heading">Namaste React functional Component</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
