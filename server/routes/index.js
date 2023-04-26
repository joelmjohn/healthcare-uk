const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');

router.use('/user', userRoute);

// get all
router.get('/', (req, res) => {
    res.send(' Test Get All');
});

// get one
router.get('/:id', (req, res) => {
    res.send(`Test Get one-id:${req.params.id}`);
});

// create one
router.post('/', (req, res) => {
    res.send(` Test create one: ${req.body}`);
});

// update one
router.patch('/:id', (req, res) => {
    res.send(` Test update one: ${req.params.id}`);
});

// delete one
router.delete('/:id', (req, res) => {
    res.send(` Test delete one:${req.params.id}`);
});


module.exports = router;