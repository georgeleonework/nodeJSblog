const express = require('express');
const blogController = require('../controllers/blogController')


const router = express.Router();

router.get('/', blogController.blog_index);


//the follow block of code takes anything submitted to the create form and save it to the database
router.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/create', blogController.blog_create_get);


router.get('/:id', blogController.blog_details);
    

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = router;