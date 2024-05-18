var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    friendRequests: {
        type: [Schema.Types.ObjectId],
        default: []
    }
});
module.exports = mongoose.model('User', userSchema);
