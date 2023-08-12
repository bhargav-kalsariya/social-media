const Post = require("../models/Post");
const User = require("../models/User");
const mapPostOutput = require("../utils/Utils");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require('cloudinary').v2;

const followAndUnfollowController = async (req, res) => {

    try {

        const { userIdToFollow } = req.body;
        const currentUserId = req._id;

        const userToFollow = await User.findById(userIdToFollow);
        const currentUser = await User.findById(currentUserId);

        if (!userToFollow) {

            return res.send(error(404, 'User not found'));

        };

        if (currentUserId === userIdToFollow) {

            return res.send(error(409, "User can't follow themselves"));

        }

        if (currentUser.followings.includes(userIdToFollow)) {

            const followingIndex = currentUser.followings.indexOf(userIdToFollow);
            currentUser.followings.splice(followingIndex, 1);

            const followerIndex = userToFollow.followers.indexOf(currentUser);
            userToFollow.followers.splice(followerIndex, 1);

        } else {

            currentUser.followings.push(userIdToFollow);
            userToFollow.followers.push(currentUserId);

        }

        await userToFollow.save();
        await currentUser.save();

        return res.send(success(200, { user: userToFollow }));

    } catch (e) {

        return res.send(error(500, e.message));

    };

};

const getPostsOfFollowings = async (req, res) => {

    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId).populate('followings');

    const fullPosts = await Post.find({
        "owner": {
            "$in": currentUser.followings
        }
    }).populate('owner');

    const posts = fullPosts.map((item) => mapPostOutput(item, currentUserId)).reverse();

    const followingsIds = currentUser.followings.map((item) => item._id);
    followingsIds.push(currentUserId);

    const suggestions = await User.find({
        _id: {
            $nin: followingsIds
        }
    })

    return res.send(success(200, { ...currentUser._doc, suggestions, posts }));

};

const getMinePostsController = async (req, res) => {

    try {

        const currentUserId = req._id;

        const posts = await Post.find({
            owner: currentUserId
        }).populate('likes');

        return res.send(success(200, { posts }));

    } catch (e) {

        return res.send(error(500, e.message));

    };

};

const getUserPostsController = async (req, res) => {

    try {

        const { userId } = req.body;

        if (!userId) {

            return res.send(error(404, "User not found"));

        };

        const posts = await Post.find({
            owner: userId
        }).populate('likes');

        return res.send(success(200, { posts }));

    } catch (e) {

        return res.send(error(500, e.message));

    };

};

const deleteMyProfileController = async (req, res) => {

    try {

        const currentUserId = req._id;
        const currentUser = await User.findById(currentUserId);

        // deletePostsOfCurrentUser 

        await Post.deleteMany({
            owner: currentUserId
        });

        // removing myself from my followers's following list

        currentUser.followers.forEach(async followerId => {

            const follower = await User.findById(followerId);
            const index = follower.followings.indexOf(currentUserId);
            follower.followings.splice(index, 1);

            await follower.save();

        });

        // removing myself from my following's follower list

        currentUser.followings.forEach(async followingId => {

            const following = await User.findById(followingId);
            const index = following.followers.indexOf(currentUserId);
            following.followers.splice(index, 1);

            await following.save();

        });


        // remove my all likes from all posts

        const posts = await Post.find();

        posts.forEach(async post => {

            const index = post.likes.indexOf(currentUserId);
            post.likes.splice(index, 1);

            await post.save();

        });

        // delete my profile

        await User.findByIdAndDelete(currentUserId);

        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true
        })

        return res.send(success(200, 'User deleted'));

    } catch (e) {

        return res.send(error(500, e.message));

    };

};

const getMyInfoController = async (req, res) => {

    try {

        const user = await User.findById(req._id);
        return res.send(success(200, { user }));

    } catch (e) {

        return res.send(error(500, e.message));

    };

};

const updateUserProfileController = async (req, res) => {

    try {

        const { name, bio, userImg } = req.body;

        const user = await User.findById(req._id);

        if (name) {

            user.name = name;

        };

        if (bio) {

            user.bio = bio;

        };

        if (userImg) {

            const cloudImg = await cloudinary.uploader.upload(userImg, {
                folder: 'userProfile'
            });
            user.avatar = {
                url: cloudImg.secure_url,
                publicId: cloudImg.public_id
            }

        };

        await user.save();
        return res.send(success(200, { user }));

    } catch (e) {

        return res.send(error(500, e.message));

    };

};

const getUserProfileController = async (req, res) => {

    try {

        const userId = req.body.userId;
        const user = await User.findById(userId).populate({
            path: 'posts',
            populate: {
                path: 'owner'
            }
        })

        const fullPost = user.posts;
        const posts = fullPost.map(item => mapPostOutput(item, req._id)).reverse();

        return res.send(success(200, { ...user._doc, posts }));

    } catch (e) {

        return res.send(error(500, e.message));

    };

};

module.exports = {
    followAndUnfollowController,
    getPostsOfFollowings,
    getMinePostsController,
    getUserPostsController,
    deleteMyProfileController,
    getMyInfoController,
    updateUserProfileController,
    getUserProfileController
}