const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    //setting the view routing for when a url is requested
    let path ='./views';
    switch(req.url) {
        case '/':
            path += 'index.html'
            break; 
        case '/about':
            path += 'about.html';
            break;
        default:
            path += '404.html'
            break
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