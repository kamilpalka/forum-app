import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
  card: {
    display: "flex",
    marginBottom: 5
  },
  content: {
    padding: 25
  }
};

export class User extends Component {
  render() {
    const {
      classes,
      user: { first_name, last_name, email, phone, address }
    } = this.props;
    return (
      <Grid container className={classes.card}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography variant="h5" color="primary">
                {first_name} {last_name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                e-mail: {email}
              </Typography>
              {phone ? (
                <Typography variant="body2">Mobile: {phone}</Typography>
              ) : null}
              {address ? (
                <Typography variant="body2">Address: {address}</Typography>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    );
  }
}

export default withStyles(styles)(User);
