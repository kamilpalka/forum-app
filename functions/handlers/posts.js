const { db } = require("../util/admin");

// get all posts from posts collection
exports.getAllPosts = (req, res) => {
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
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount
        });
      });
      return res.json(posts);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// get comments of id post
exports.getPost = (req, res) => {
  let postData = {};
  db.doc(`/posts/${req.params.postId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      postData = doc.data();
      postData.postId = doc.id;
      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("postId", `==`, req.params.postId)
        .get();
    })
    .then(data => {
      postData.comments = [];
      data.forEach(doc => {
        postData.comments.push(doc.data());
      });
      return res.json(postData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// post one post and insert it into posts collection
exports.postOnePost = (req, res) => {
  const newPost = {
    body: req.body.body,
    title: req.body.title,
    createdAt: new Date().toISOString(),
    commentCount: 0
  };

  let errors = {};

  if (req.body.body.trim() === "") errors.body = "Cannot be empty";
  if (req.body.title.trim() === "") errors.title = "Cannot be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  db.collection("posts")
    .add(newPost)
    .then(doc => {
      // const resPost = newPost;
      // resPost.postId = doc.id;
      // res.json(resPost);
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.log(err);
    });
};

// add comment to chosen post
exports.commentOnPost = (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ error: "Cannot be empty" });
  if (req.body.name.trim() === "")
    return res.status(400).json({ error: "Cannot be empty" });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    postId: req.params.postId,
    name: req.body.name,
    email: req.body.email
  };

  db.doc(`/posts/${req.params.postId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Something went wrong" });
    });
};

// delete posts
exports.deletePost = (req, res) => {
  const document = db.doc(`/posts/${req.params.postId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Post deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
