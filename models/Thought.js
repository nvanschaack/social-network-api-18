const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    //COLUMNS
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: reactionSchema
            }
        ]
    },
    //TABLE OPTIONS
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//Create a virtual called reactionCount ...
thoughtSchema
    .virtual('reactionCount')
    //that retrieves the length of the thought's reactions array field on query.
    .get(function () {
        return this.reactions.length
    });

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;