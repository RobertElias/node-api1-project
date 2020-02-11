const express = require('express');

const Users = require('./data/db.js')

const server = express()

server.get('/', (req, res) =>{
    res.json({hello: 'You are working on NODE-API1-PROJECT'})
});

//view list of users with GET /api/users
server.get('/api/users', (req, res)=>{
    // get the users from the database
    Users.find().then(users => {
        res.status(200).json(users);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    });
    
})

//findById
server.get('/api/users/:id', (req, res)=>{
    // get the users from the database by ID
    Users.findById(req.params.id).then(users => {
        if (users === undefined) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else{
            res.status(200).json(user)       
        }
    }).catch(err =>{
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    });
    
})

const port = 5000;
server.listen(port, () => console.log(`\n** Apis is on port: ${port} **\n`));