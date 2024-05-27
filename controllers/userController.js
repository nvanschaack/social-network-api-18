const { User } = require('../models')

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.error({ message: error });
            return res.status(500).json(error);
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body)
            res.json(newUser)
        } catch (error) {
            console.error({ message: error });
            return res.status(500).json(error);
        }
    },
    async getSingleUser(req, res) {
        try {
            const oneUser = await User.findOne({ _id: req.params.userId }).populate('friends').populate('thoughts')

            if (!oneUser) {
                return res.json('Incorrect user id')
            }

            res.json(oneUser)
        } catch (error) {
            console.error({ message: error });
            return res.status(500).json(error);
        }
    },
    async updateUser(req, res) {
        try {
            const updateUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                //set whatever is in the req.body (as long as it matches a field in the model), it doesnt have to include every field, just the one you want to update
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!updateUser) {
                return res.status(404).json({ message: 'userId not found' })
            }

            res.json(updateUser)

        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
    async deleteUser(req, res) {
        try {
            const deleteUser = await User.findOneAndDelete(
                { _id: req.params.userId }
            )
            if (!deleteUser) {
                res.json('Please provide a correct userId')
            }

            res.json(`User with ID ${deleteUser._id} has been deleted`)

        } catch (error) {
            console.error({ message: error });
            return res.status(500).json(error);
        }
    },
    //add a friend and delete a friend
    async addFriend(req, res) {
        try {
            const updateUserByAddingFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )

            if (!updateUserByAddingFriend) {
                return res.json('Use a correct userId to update friends')
            }
            res.json(`User with Id ${updateUserByAddingFriend._id} has been updated by adding a friend `)

        } catch (error) {
            console.error({ message: error });
            return res.status(500).json(error);
        }

    },
    async deleteFriend(req, res) {
        try {
            const deleteFriendFromUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
          
            if (!deleteFriendFromUser) {
                return res.json('Use a correct userId to delete friends')
            }
            res.json(`User with Id ${deleteFriendFromUser._id} has been updated by removing a friend `)

        } catch (error) {
            console.error({ message: error });
            return res.status(500).json(error);
        }
    }
}