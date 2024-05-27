const { Thought, User } = require('../models')

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async getOneThought(req, res) {
        try {
            const oneThought = await Thought.findOne({ _id: req.params.thoughtId }).populate('reactions')
            if (!oneThought) {
                return res.json(`Incorrect thoughtId`)
            }
            res.json(oneThought)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async createOneThought(req, res) {
        try {
            const createThought = await Thought.create(req.body)

            const updateUserByAddingThought = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: createThought._id } },
                { runValidators: true, new: true }
            )
            if (!updateUserByAddingThought) {
                return res.json('User cannot be found by Id')
            }
            res.json(updateUserByAddingThought)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async updateOneThought(req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!updateThought) {
                return res.status(404).json({ message: 'thoughtId not found' })
            }

            res.json(updateThought)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async deleteOneThought(req, res) {
        try {
            const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            if (!deleteThought) {
                res.status(404).json(`Please provide a correct thoughtId`)
            }
            res.json(`thought with id ${deleteThought._id} has been deleted`)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async addReactionToThought(req, res) {
        try {

        } catch (error) {

        }
    },
    async deleteReactionFromThought(req, res) {
        try {

        } catch (error) {

        }
    },
}