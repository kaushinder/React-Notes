import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    
// create state object
    this.state = {
      userInfo: {
        name: "Dummy Name",
        location: "Default",
      }
      // count: 0,
      // count2: 1,
    };
    console.log(this.props.name + "Child - constructor");
  }

  async componentDidMount() {
    console.log(this.props.name + "Child - component Did Mount");

    // Api calls
    const data = await fetch("https://api.github.com/users/akshaymarch7");
    const json = await data.json();


    this.setState({
      userInfo: json,
    })

    console.log(json);
  }

  componentDidUpdate() {
  console.log("Component Did Update");
}

componentWillUnmount() {
  console.log("Component Will Unmount");
}

  render() {
    // const { name, location } = this.props;
    // const { count, count2 } = this.state;

    console.log(this.props.name + "Child - render");

    const {name, location, avatar_url} = this.state.userInfo;
    // debugger;

    return (
      <div className="user-card">
        {/* <h1>Count: {count}</h1>
        <h1>Count2: {count2}</h1>
        <button
          onClick={() => {
            // Never update state variable directly
            this.setState({ count: count + 1, count2: count2 + 1 });
          }}
        >
          Count Increase
        </button> */}
        <img src={avatar_url} alt="avatar" />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: @thakur_kaushinder</h4>
      </div>
    );
  }
}

/* Console Output Explanation:
 When the About component (parent) is rendered, its constructor is called first,
 followed by its render method. During the render of the parent, the UserClass
 components (children) are instantiated, triggering their constructors and render methods.
 After the initial render, React updates the DOM and then calls componentDidMount
 for each component in the order they were mounted.
 
-parent constructor
-parent render

    -child constructor(multiple)
    -child render(multiple)

    -DOM UPDATED(IN single batch)

    -child component Did Mount

-parent component Did Mount
*/



// constructor (dummy)
// render (dummy)
// <html dummy>
// componentDidMount 
// (API Call)
// <this.setState> state var updated

// upadte

// render (api data) - re render
// <html new Api data>
// componentDidUpdate







export default UserClass;
