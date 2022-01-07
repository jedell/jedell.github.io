const router = require('express').Router();

let Player = require('../models/player.model');

//get all players
router.route('/').get((request, resolution) => {
    Player.find()
        .then(players => resolution.json(players))
        .catch(err => resolution.status(400).json('Error: ' + err));
});

//get player by MongoDB :id
router.route('/:id').get((request, resolution) => {
    Player.findById(request.params.id)
        .then(player => resolution.json(player))
        .catch(err => resolution.status(400).json('Error: ' + err))
})

//update player by :id
router.route('/update/:id').post((request, resolution) => {
    Player.findById(request.params.id)
        .then(player => {
            player.name = request.body.name;

            player.save()
                .then(() => resolution.json('Player Updated'))
                .catch(err => resolution.status(400).json('Error: '+err));
        })
        .catch(err => resolution.status(400).json('Error: '+err));
})

//add player
router.route('/add').post((request, resolution) => {
    const name = request.body.name;

    const newPlayer = new Player({name});

    newPlayer.save()
        .then(() => resolution.json('Player added'))
        .catch(err => resolution.status(400).json('Error: ' + err));
});

module.exports = router;