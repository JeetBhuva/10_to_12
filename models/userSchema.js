const mongoose = require('mongoose');

const userSchema = {
    name: String,
    email: String,
    password: String,
    mobile: Number,
    age: Number
}

const MyModel = mongoose.model('User', userSchema);

module.exports = MyModel