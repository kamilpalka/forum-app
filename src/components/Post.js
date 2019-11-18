import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MyButton from "../util/MyButton";
// icons
import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  content: {
    padding: 25
  }
};

export class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { body, title, createdAt, commentCount }
    } = this.props;

    return (
      <Grid container className={classes.card}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Typography variant="h6" color="secondary">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {dayjs(createdAt).fromNow()}
              </Typography>
              <Typography variant="body1">{body}</Typography>
              <MyButton tip="comments">
                <ChatIcon color="primary" />
              </MyButton>
              <span>{commentCount} comments</span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    );
  }
}

export default withStyles(styles)(Post);
