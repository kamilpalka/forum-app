import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  content: {
    padding: 25
  }
};

export class User extends Component {
  render() {
    const {
      classes,
      user: { first_name, last_name, email }
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant="h5" color="primary">
            {first_name} {last_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            e-mail: {email}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(User);
