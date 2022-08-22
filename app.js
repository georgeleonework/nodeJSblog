const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


//this is an express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://georgeleone:test1234@cluster0.tdwflkg.mongodb.net/nodeblog?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine //below configures some application settings

app.set('view engine', 'ejs');

//listen for requests
//middleware and static files

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //allows us to post requests if we use middleware to accept form data url encoded
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

///routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
 }); 

app.get('/about', (req, res) => {
    res.render('about', { title: "About"});
});

//blog routes

app.use('/blogs', blogRoutes);


//if there is still no match at this point for the request, we will "use" the following function
///this is to create middleware and use middleware functions in express

app.use((req, res) => {
    res.status(404).render('404', { title: "404 "});
});