const express = require("express");

const Users = require("./data/db.js");

const server = express();

server.get("/", (req, res) => {
  res.json({ hello: "You are working on NODE-API1-PROJECT" });
});

//Creates a user using the information sent inside the request body Post /api/users
server.post("/api/users", (req, res) => {
  // get the users from the database by ID

  const usersDetails = req.body;
  if (!req.body.name || !req.body.bio) {
    req
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.insert(usersDetails)
      .then(users => {
        res.status(201).json(users);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});
//Returns an array of all the user objects contained in the database GET /api/users
server.get("/api/users", (req, res) => {
  // get the users from the database
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

//Returns the user object with the specified id findById /api/users/:id
server.get("/api/users/:id", (req, res) => {
  // get the users from the database by ID
  Users.findById(req.params.id)
    .then(users => {
      if (users === undefined) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

// Removes the user with the specified id and returns the deleted user. with /api/users/:id
server.delete("/api/user/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(removed => {
      if (removed === undefined) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(removed);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

//Updates the user with the specified id using data from the request body
//Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res)=> {
    Users.update(req.params.id, req.body).then(users =>{
        //If the user with the specified id is not found:
        if(users === undefined){
            res.status(404).json({message: "The user with the specified ID does not exist."})
        //If the request body is missing the name or bio property:
        }else if(!req.body.name || !req.body.bio){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
        //If the user is found and the new information is valid:
        } else {
            res.status(200).json(users)
        }
    })
    //If there's an error when updating the user:
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be modified." });
      });
})

const port = 5000;
server.listen(port, () => console.log(`\n** Apis is on port: ${port} **\n`));
