const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const documentRoute = require('./document.route');

router.use('/user', userRoute);
router.use('/document', documentRoute);

//Testing only- need to be removed
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