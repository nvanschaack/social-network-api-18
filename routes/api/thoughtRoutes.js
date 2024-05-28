const { getAllThoughts, createOneThought, getOneThought, updateOneThought, deleteOneThought, addReactionToThought, deleteReactionFromThought } = require('../../controllers/thoughtController');

const router = require('express').Router();

// /api/thoughts
router.route('/').get(getAllThoughts).post(createOneThought)

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getOneThought).put(updateOneThought).delete(deleteOneThought)

// / api/thoughts/:thoughtId/reactions/reactionsId
router.route('/:thoughtId/reactions/:reactionsId').delete(deleteReactionFromThought)

router.route('/:thoughtId/reactions').post(addReactionToThought)

module.exports = router