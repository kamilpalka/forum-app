const functions = require("firebase-functions");

const app = require("express")();

const {
  getAllPosts,
  postOnePost,
  getPost,
  commentOnPost,
  deletePost
} = require("./handlers/posts");
const { signup, getUserDetails, deleteUser } = require("./handlers/users");

// posts routes
// get posts from firebase collection
app.get("/posts", getAllPosts);
// creating post by user in firebase collection
app.post("/post", postOnePost);
// get comments on posts by id
app.get("/post/:postId", getPost);
// post comments on posts
app.post("/post/:postId/comment", commentOnPost);
// delete post
app.delete("/post/:postId", deletePost);

// users route
// creating users in firebase collection
app.post("/signup", signup);
app.get("/user", getUserDetails);
app.delete("/user/:userId", deleteUser);
// app.post('/user', addUserDetails)

// https://baseurl.com/api/
exports.api = functions.region("europe-west1").https.onRequest(app);
