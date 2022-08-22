//creating the following functions
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      })
}

const blog_details = (req, res) => {
    const id = req.params.id; //we need to first extract the id parameter from the request
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result })
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_create_get = (req, res) => {
    res.render('create', {title: 'Create a new Blog'});
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get
} //now we have access to this controller from anywhere that we import the file