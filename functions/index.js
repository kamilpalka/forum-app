const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyC5qcz4AKxvs1Q3tRg8bfcGEgW_fx4iIZQ",
  authDomain: "forum-app-cf14b.firebaseapp.com",
  databaseURL: "https://forum-app-cf14b.firebaseio.com",
  projectId: "forum-app-cf14b",
  storageBucket: "forum-app-cf14b.appspot.com",
  messagingSenderId: "322672924009",
  appId: "1:322672924009:web:4ece5bd0601e6d2a9319f8",
  measurementId: "G-6WN0LKPN96"
};

const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

// getting posts from firebase collection
app.get("/posts", (req, res) => {
  db.collection("posts")
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

  db.collection("posts")
    .add(newPost)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.log(err);
    });
});

const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

// creating users in firebase collection
app.post("/signup", (req, res) => {
  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address
  };

  // validation process
  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = "Cannot be empty";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(newUser.first_name)) errors.first_name = "Cannot be empty";
  if (isEmpty(newUser.last_name)) errors.last_name = "Cannot be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  db.collection("users")
    .add(newUser)
    .then(doc => {
      res.json({ message: `user ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.log(err);
    });
});

// https://baseurl.com/api/

exports.api = functions.region("europe-west1").https.onRequest(app);
