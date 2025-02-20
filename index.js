const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/NodeAPI')

const userSchema = {
    name: String,
    email: String,
    mobile: Number,
    age: Number
}

const MyModel = mongoose.model('User', userSchema);

const main = async (req, res) => {

    const data = await MyModel.insertOne({ name: "Jeet", email: "jeet@gmail.com", mobile: 9812345678, age: 20 })

    // console.log(data);
}

main();