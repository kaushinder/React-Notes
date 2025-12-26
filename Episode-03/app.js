import React from "react";
import ReactDOM from "react-dom/client";

const title = (
<h1 className="head" tabIndex="5">
  Namaste React using JSX</h1>
);

const Title = ()  => (
<h1 className="head" tabIndex="5">
  Namaste React using JSX</h1>
);

// const data = api.getData();

const HeadingComponent = () => (
<div id="container">
  <Title />
  {Title()}
  {title}
  <h1 className="heading">Namaste React using Functional Component</h1>
</div>
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HeadingComponent />);