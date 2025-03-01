const express = require('express')

const app = express();

app.use(express.json())

require('./db/db')

const user = require('./controllers/user.controllers')
const { userToken } = require('./Middleware/userToken')

// user API
app.post('/register', user.userRegister)
app.post('/login', userToken, user.userLogin)




app.listen(5000, () => console.log("Server running on port 5000"));

