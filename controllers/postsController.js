const { success } = require("../utils/responseWrapper");

const getAllPostsController = (req, res) => {

    console.log(req._id);
    res.send(success(200, 'These are all the posts'));

};

module.exports = {
    getAllPostsController
}