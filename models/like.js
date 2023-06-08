const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
    },
     //defines object id of the liked object
    likable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    //defines typeof the liked object dince this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;