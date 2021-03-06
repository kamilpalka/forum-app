import React, { Component } from "react";
import { Link } from "react-router-dom";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

export class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Button color="inherit" component={Link} to="/create">
            Add User
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/">
            Posts
          </Button>
          <Button color="inherit" component={Link} to="/posts">
            Add Posts
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
