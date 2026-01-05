import React from "react";
import User from "./User.js";
import UserClass from "./UserClass.js";

class About extends React.Component {
  constructor(props) {
    super(props);

    console.log("Parent - constructor");
  }

  componentDidMount() {
    console.log("Parent - component Did Mount");
  }

  render() {
    console.log("Parent - render");
    return (
      <div>
        <h1>About Class Component</h1>
        <h2>This is Namaste React Series</h2>
        {/* <User name={"First"} location={"noida function"} /> */}
        <UserClass name={"First"} location={"noida function"} />
      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1>About us Page</h1>
//       <h2>This is Namaste React Series</h2>
//       <User name={"Kaushinder (function)"} location={"greator noida"} />
//       <UserClass name={"Kaushinder Singh Raghav (class)"} location={"greator noida"} />
//     </div>
//   );
// };

export default About;
