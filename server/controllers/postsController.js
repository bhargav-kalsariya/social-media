const Post = require("../models/Post");
const User = require("../models/User");
const mapPostOutput = require("../utils/Utils");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require('cloudinary').v2;


const createPostController = async (req, res) => {

    try {

        const { caption, postImg } = req.body;
        const owner = req._id;
        const user = await User.findById(req._id);

        if (!caption || !postImg) {

            return res.send(error(400, 'Caption and postImg are required'));

        }

        const cloudImg = await cloudinary.uploader.upload(postImg, {

            folder: 'postImg'

        })

        const post = await Post.create({

            owner,
            caption,
            image: {
                publicId: cloudImg.public_id,
                url: cloudImg.secure_url
            }

        });

        user.posts.push(post._id);
        await user.save();

        return res.send(success(201, { post }));

    } catch (e) {

        res.send(error(500, e.message));

    }

};

const likeAndUnlikeController = async (req, res) => {

    try {

        const { postId } = req.body;
        const currentUserId = req._id;

        const post = await Post.findById(postId).populate('owner');

        if (!post) {

            return res.send(error(404, 'Post Not Found'));

        }

        if (post.likes.includes(currentUserId)) {

            const index = post.likes.indexOf(currentUserId);
            post.likes.splice(index, 1);

        } else {

            post.likes.push(currentUserId);

        }

        await post.save();
        return res.send(success(200, { post: mapPostOutput(post, req._id) }));

    } catch (e) {

        return res.send(error(500, e.message));

    }

};

const updatePostCOntroller = async (req, res) => {

    try {

        const { postId, caption } = req.body;
        const currentUserId = req._id;

        const post = await Post.findById(postId);

        if (!post) {

            return res.send(error(404, "Post Not Found"));

        }

        if (post.owner.toString() !== currentUserId) {

            return res.send(error(403, 'only Owner can update post'));

        }

        if (caption) {

            post.caption = caption;

            await post.save();
            return res.send(success(200, post));

        }

    } catch (e) {

        return res.send(error(500, e.message));

    }

};

const deletePostController = async (req, res) => {

    try {

        const { postId } = req.body;
        const currentUserId = req._id;

        const post = await Post.findById(postId);
        const currentUser = await User.findById(currentUserId);

        if (!post) {

            return res.send(error(404, "Post Not Found"));

        }

        if (post.owner.toString() !== currentUserId) {

            return res.send(error(403, 'only Owner can delete post'));

        }

        const index = currentUser.posts.indexOf(postId);
        currentUser.posts.splice(index, 1);

        await currentUser.save();
        await Post.findByIdAndDelete(postId);

        return res.send(success(200, "post deleted successfully"));

    } catch (e) {

        return res.send(error(500, e.message));

    }

};

module.exports = {
    createPostController,
    likeAndUnlikeController,
    updatePostCOntroller,
    deletePostController
}