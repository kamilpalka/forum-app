import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Components
import Navbar from "./components/Navbar";

// Pages
import home from "./pages/home";
import users from "./pages/users";
import createUser from "./pages/createUser";
import addPost from "./pages/addPost";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#0062ff",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route path="/users" component={users} />
                <Route path="/create" component={createUser} />
                <Route path="/posts" component={addPost} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
