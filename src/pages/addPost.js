import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";

// Mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    textAlign: "center"
  },
  textArea: {
    minWidth: 300,
    margin: "30px auto 30px auto"
  },
  pageTitle: {
    margin: "20px auto 20px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: "10px",
    position: "relative"
  },
  progress: {
    position: "absolute"
  }
};

class addPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      loading: false,
      errors: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const postData = {
      title: this.state.title,
      body: this.state.body
    };
    axios
      .post("/post", postData)
      .then(res => {
        console.log(res.data);
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h4" className={classes.pageTitle}>
            Create Post
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="title"
              name="title"
              label="Title"
              className={classes.textField}
              helperText={errors.title}
              error={errors.title ? true : false}
              value={this.state.title}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="body"
              name="body"
              label="Body"
              multiline
              rows="4"
              helperText={errors.body}
              error={errors.body ? true : false}
              value={this.state.body}
              className={classes.textArea}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              submit
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

addPost.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(addPost);
