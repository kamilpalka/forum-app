const functions = require("firebase-functions");

const app = require("express")();

const { getAllPosts, postOnePost } = require("./handlers/posts");
const { signup } = require("./handlers/users");

// posts routes
// getting posts from firebase collection
app.get("/posts", getAllPosts);
// creating posts in firebase collection
app.post("/post", postOnePost);

// users route
// creating users in firebase collection
app.post("/signup", signup);
// app.post('/user', addUserDetails)

// https://baseurl.com/api/
exports.api = functions.region("europe-west1").https.onRequest(app);
