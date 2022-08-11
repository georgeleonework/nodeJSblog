const express = require('express');

const app = express();

//listen for requests
app.listen(3000)

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname });
}); //basic setup here to respond to a given url with express

app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/about-us', (req, res) => {
    res.redirect('/about'); //super easy way to redirect an about-us request to about page
})