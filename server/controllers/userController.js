const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");

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

            await userToFollow.save();
            await currentUser.save();

            return res.send(success(200, 'User Unfollowed'));

        } else {

            currentUser.followings.push(userIdToFollow);
            userToFollow.followers.push(currentUserId);

            await userToFollow.save();
            await currentUser.save();

            return res.send(success(200, 'User Followed'));

        }

    } catch (e) {

        return res.send(error(500, e.message));

    }

};

module.exports = {
    followAndUnfollowController
}