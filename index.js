// implement your API here

const express = require('express');

const db = require('./data/db.js')
const server = express();
server.use(express.json());

server.listen(9090, () => {
    console.log('Listening on port 9090')
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Must provide name and bio" });
        return; 
    }

    db.insert({
        name,
        bio, 
    })
    .then(() => {
        res.status(201).json({ name, bio })
    })
    .catch(() => {
        res.status(500).json({ error: "There was an error saving the user to the database" })
        return;
    })   
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(201).json(users)
    })
    .catch(() => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(user => {
        if (user) {
            res.status(201).json(user)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})