const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();
    greet();

    //set header content type
    // res.setHeader('Content-Type', 'text/html'); // we don't need this because it's been streamlined by express

    //setting the view routing for when a url is requested
    let path ='./views';
    switch(req.url) {
        case '/':
            path += '/index.html'
            res.statusCode = 200;
            break; 
        case '/about':
            path += '/about-blah.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about'); //here were redirecting the user to the about page if they try to referene and old link
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
    }
    
    //read and send send html file
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            // res.write(data); we dont need this because we can pass the data directly into end method
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});

//setting up the http server to listen on local host 3000 whenever we run the server.js script