import User from "./User.js";
import UserClass from "./UserClass.js";

const About = () => {
  return (
    <div>
      <h1>About us Page</h1>
      <h2>This is Namaste React Series</h2>
      <User name={"Kaushinder (function)"} location={"greator noida"} />
      <UserClass name={"Kaushinder Singh Raghav (class)"} location={"greator noida"} />
    </div>
  );
};

export default About;