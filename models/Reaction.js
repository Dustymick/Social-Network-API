const { Schema, Types } = require("mongoose");
const { Schema } = require("./User");

const ReactionSchema = new Schema({
    ReactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId
    },
    ReactionBody: {
      type: String,
      required: True,
      maxlength: 280,
    },
    userName: {
      type: String, 
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },   
    
      toJSON: {
        getters: true,
      },
      id: false
    }
  );
  
 
module.exports = Reaction;