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
const { MongoClient } = require('mongodb');
// const { add, sub } = require('./calculater')
const url = "mongodb://localhost:27017"
const client = new MongoClient(url);
const app = express();

async function getData(req, res) {
    await client.connect();
    const db = client.db("NodeAPI");
    const collection = db.collection('User');
    // console.log(collection);
    const data = await collection.find({}).toArray()
    return data
    // console.log(data);
}

app.get('/getData', async (req, res) => {
    const data = await getData();
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



