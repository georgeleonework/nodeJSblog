const express = require('express');

const app = express();

//register view engine //below configures some application settings
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000)

app.get('/', (req, res) => {
    res.render('index');
}); 

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blogs/create', (req, res) => {
    res.render()
})

app.get('/about-us', (req, res) => {
    res.redirect('/about'); //super easy way to redirect an about-us request to about page
})

//if there is still no match at this point for the request, we will "use" the following function
///this is to create middleware and use middleware functions in express
app.use((req, res) => {
    res.status(404).render('404');
})