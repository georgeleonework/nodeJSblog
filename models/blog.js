const mongoose = require('mongoose');
const Schema = mongoose.Schema; //**a schema is a thing that a model wraps around */

const blogSchema = new Schema({ // this line creates a new instance of a Schema object
    title: { //this is the title property of the blog 
        type: String,
        required: true
    },
    snippet: { //we want our blogs to have a snippet property
        type: String,
        required: true
    },
    body: { //we need a body to hold the text for the blog
        type: String,
        required: true
    }
}, {timestamps: true }); //automatically generates a time document on blog properties


//we need to create a model (typically have capital letter) that will be based on the schema that we just created
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;