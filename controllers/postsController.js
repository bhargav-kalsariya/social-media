const getAllPostsController = (req, res) => {

    console.log(req._id);
    res.status(200).send('These are all the posts');

};

module.exports = {
    getAllPostsController
}