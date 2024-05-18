var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var friendRequestSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);