//SUBDOCUMENT
const { Schema, Types } = require('mongoose');

const formatDate = (date)=> {
    const newDate = date.toLocaleDateString()

    return newDate
}

//Schema to create a reaction
//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const reactionSchema = new Schema(
    {
        reactionId: {
            //Use Mongoose's ObjectId data type
            // Default value is set to a new ObjectId
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
            get: (timestamp)=> formatDate(timestamp)
        }
    },
    {
        id: false,
        toJSON: {
            getters: true
        }
    }
);


module.exports = reactionSchema;