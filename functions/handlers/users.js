const { db } = require("../util/admin");

const config = require("../util/config");

const firebase = require("firebase");
firebase.initializeApp(config);

// sign users up
exports.signup = (req, res) => {
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
};

// add user details
// exports.addUserDetails = (req, res) => {
//   let userDetails = reduceUserDetails(req.body);

// };

// validating & helper functions

const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

// const reduceUserDetails = data => {
//   let userDetails = {};

//   if (!isEmpty(data.phone.trim())) userDetails.bio = data.bio;
//   if (!isEmpty(data.address.trim())) userDetails.address = data.address;

//   return userDetails;
// };
