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
        res.status(500).json({errorMessage: 'sorry about that'})
    });
    
})

const port = 5000;
server.listen(port, () => console.log(`\n** Apis is on port: ${port} **\n`));