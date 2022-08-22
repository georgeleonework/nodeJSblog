const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


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

//mongoose and sandbox routes

app.get('/add-blog', (req, res) => {
    const blog = new Blog({ //were using the Blog model to crete a new isntanceof the blog document within the code
        title: 'george blog number two',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save() //were calling a method on the new instance of blog that was just created in the last block of code
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find() //finds all of the documents inside of the blog model
        .then((result) => {
            res.send(result); 
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/single-blog', (req, res) => {
    Blog.findById('6303a7fad411555f92fba2d6')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})


// routes

app.get('/', (req, res) => {
   res.redirect('/blogs');
}); 

app.get('/about', (req, res) => {
    res.render('about', { title: "About"});
});

// blog routes

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //sorting the blogs in descending order whereas 1 would be ascending order
        .then((result) => { //result is an array of blogs
            res.render('index', {title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create" });
})

//the follow block of code takes anything submitted to the create form and save it to the database
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
})


//if there is still no match at this point for the request, we will "use" the following function
///this is to create middleware and use middleware functions in express

app.use((req, res) => {
    res.status(404).render('404', { title: "404 "});
});