const http = require('http')
const url = require('url')
const querystring = require('querystring')
const { add, sub } = require('./calculater')

http.createServer(
    function (req, res) {
        // console.log(req.url);
        const reqURL = req.url

        const parseURL = url.parse(reqURL)
        const querystringParse = querystring.parse(parseURL.query)
        // console.log(querystringParse);

        const num1 = querystringParse.num1;
        const num2 = querystringParse.num2;

        if (reqURL.includes('/add')) {
            // console.log(add(num1, num2));

            res.write(add(num1, num2))
        } else if (reqURL.includes('/sub')) {
            res.write(sub(num1, num2))
        }

        res.end();
    }

).listen(8080)