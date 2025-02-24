const MyModel = require('../models/userSchema')
const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
    const { name, email, password, mobile, age } = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    const data = await MyModel.create({
        name: name,
        email: email,
        password: hashPassword,
        mobile: mobile,
        age: age
    })
    res.send(data)
}

const userLogin = async (req, res) => {

    const { email, password } = req.body

    const data = await MyModel.findOne({ email: email })

    if (!data) {
        res.send("Wrong User")
    } else {
        const comparePassword = await bcrypt.compare(password, data.password);

        if (comparePassword) {
            res.send('User Login Successful')
        } else {
            res.send('Wrong Password')
        }
    }

}

module.exports = {
    userRegister,
    userLogin
}