const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const formatDate = (date)=> {
    const newDate = date.toLocaleDateString()

    return newDate
}

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
            get: (timestamp)=> formatDate(timestamp)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ]
    },
    //TABLE OPTIONS
    {
        toJSON: {
            virtuals: true,
             getters: true
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