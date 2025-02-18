// const http = require('http')
// const url = require('url')
// const querystring = require('querystring')
// const { add, sub } = require('./calculater')

// http.createServer(
//     function (req, res) {
//         // console.log(req.url);
//         const reqURL = req.url

//         const parseURL = url.parse(reqURL)
//         const querystringParse = querystring.parse(parseURL.query)
//         // console.log(querystringParse);

//         const num1 = querystringParse.num1;
//         const num2 = querystringParse.num2;

//         if (reqURL.includes('/add')) {
//             // console.log(add(num1, num2));
//             res.write(add(num1, num2))
//         } else if (reqURL.includes('/sub')) {
//             res.write(sub(num1, num2))
//         }
//         res.end();
//     }

// ).listen(8080)

const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
// const { add, sub } = require('./calculater')
const url = "mongodb://localhost:27017"
const client = new MongoClient(url);
const app = express();

app.use(express.json())

async function getData(req, res) {
    await client.connect();
    const db = client.db("NodeAPI");
    const collection = db.collection('User');
    // console.log(collection);
    const data = await collection.find({}).toArray()
    return data
    // console.log(data);
}

async function insertData(data) {
    await client.connect();
    const db = client.db("NodeAPI");
    const collection = db.collection('User');
    const insertUserData = await collection.insertOne(data)
    console.log(insertUserData);

}
// insertData();

async function updateData(id, data) {
    await client.connect();
    const db = client.db("NodeAPI");
    const collection = db.collection('User');
    const insertUserData = await collection.updateOne({ _id: new ObjectId(id) }, {
        $set: data
    })

    return insertUserData
}

async function deleteData(id) {
    await client.connect();
    const db = client.db("NodeAPI");
    const collection = db.collection('User');
    const deleteUserData = await collection.deleteOne({ _id: new ObjectId(id) })

    return deleteUserData

}

app.get('/getData', async (req, res) => {
    const data = await getData();
    res.send(data)
})

app.post('/insertData', async (req, res) => {
    const data = await insertData(req.body);
    res.send(data)
})

app.put('/updateData/:id', async (req, res) => {
    const data = await updateData(req.params.id, req.body);
    res.send(data)
})

app.delete('/deleteData/:id', async (req, res) => {
    const data = await deleteData(req.params.id);
    res.send(data)
})



// app.get('/add/:num1/:num2', (req, res) => {
//     // res.send(add(req.query.num1, req.query.num2));
//     res.send(add(req.params.num1, req.params.num2));
// })

// app.get('/sub', (req, res) => {
//     res.send(sub(5, 10));
// })

app.listen(8000)



