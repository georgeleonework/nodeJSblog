const express = require('express');

const app = express();

//register view engine //below configures some application settings
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000)

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', { title: "Home", blogs});
}); 

app.get('/about', (req, res) => {
    res.render('about', { title: "About"});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create" });
})

app.get('/about-us', (req, res) => {
    res.redirect('/about'); //super easy way to redirect an about-us request to about page
})

//if there is still no match at this point for the request, we will "use" the following function
///this is to create middleware and use middleware functions in express
app.use((req, res) => {
    res.status(404).render('404', { title: "404 "});
})