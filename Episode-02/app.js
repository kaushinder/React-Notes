import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement(
  "div",
  { id: "parent" },
  [
    React.createElement(
      "div",
      { id: "child", key: "child1" },
      [
        React.createElement("h1", { id: "heading", key: "h1" }, "This is Namaste React"),
        React.createElement("h2", { id: "heading", key: "h2" }, "I'm an h2 tag")
      ]
    ),
    React.createElement(
      "div",
      { id: "child2", key: "child2" },
      [
        React.createElement("h1", { id: "heading", key: "h1b" }, "I'm an h1 tag"),
        React.createElement("h2", { id: "heading", key: "h2b" }, "I'm an h2 tag")
      ]
    )
  ]
);

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
