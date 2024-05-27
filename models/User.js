const { Schema, model } = require('mongoose');

//Schema to create a User model
const userSchema = new Schema(
    // COLUMNS
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // Must match a valid email address (look into Mongoose's matching validation)
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    // TABLE OPTIONS
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Create a virtual called friendCount ...
userSchema
    .virtual('friendCount')
    //that retrieves the length of the user's friends array field on query.
    .get(function () {
        return this.friends.length
    });

const User = model('User', userSchema)

module.exports = User;