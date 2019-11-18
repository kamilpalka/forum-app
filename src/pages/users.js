import React, { Component } from "react";
import axios from "axios";
import User from "../components/User";

export class home extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    axios
      .get("/user")
      .then(res => {
        console.log(res.data);
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let UsersList = this.state.users ? (
      this.state.users.map(user => <User key={user.userId} user={user} />)
    ) : (
      <p> Loading ...</p>
    );
    return <>{UsersList}</>;
  }
}

export default home;
