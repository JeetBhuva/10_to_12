const MyModel = require('../models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = "J@e123e#t$"

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

            const token = await jwt.sign({ email: data.email, password: data.password }, privateKey, { expiresIn: '1h' })

            // console.log(token);

            res.status(201).send({ msg: 'User Login Successful', token, data: data })
        } else {
            res.send('Wrong Password')
        }
    }
}

module.exports = {
    userRegister,
    userLogin
}