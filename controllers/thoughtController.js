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
    // HOW DO I ACTUALLY CREATE THE REACTION THOUGH?
    async addReactionToThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.params.reactionsId } },
                { runValidators: true, new: true }
            )
            if (!thought) {
                return res.status(404).json(`Use a correct thoughtId in order to add a reaction`)
            }
            res.status(200).json(`Thought with id ${thought._id} has a reaction added to it`)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async deleteReactionFromThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionsId } },
                { runValidators: true, new: true }
            )
            if (!thought) {
                return res.status(404).json(`Use a correct thoughtId in order to delete a reaction`)
            }
            res.status(200).json(`Thought with id ${thought._id} has a reaction deleted from it`)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
}