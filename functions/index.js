const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const experss = require("express");
const app = experss();

// getting posts from firebase collection
app.get("/posts", (req, res) => {
  admin
    .firestore()
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let posts = [];
      data.forEach(doc => {
        posts.push({
          postId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          title: doc.data().title,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(posts);
    })
    .catch(err => console.log(err));
});

// creating posts in firebase collection
app.post("/post", (req, res) => {
  const newPost = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    title: req.body.title,
    createdAt: new Date().toISOString()
  };

  admin
    .firestore()
    .collection("posts")
    .add(newPost)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.log(err);
    });
});

// https://baseurl.com/api/

exports.api = functions.region("europe-west1").https.onRequest(app);
