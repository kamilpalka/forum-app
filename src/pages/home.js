import React, { Component } from "react";
import axios from "axios";
import Post from "../components/Post";

export class home extends Component {
  state = {
    posts: null
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then(res => {
        console.log(res.data);
        this.setState({
          posts: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentPostsMarkup = this.state.posts ? (
      this.state.posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      <p> Loading ...</p>
    );
    return <>{recentPostsMarkup}</>;
  }
}

export default home;
