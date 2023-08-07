const mapPostOutput = (post, userId) => {

    return {

        _id: post._id,
        caption: post.caption,
        image: post.image,
        owner: {
            _id: post.owner._id,
            name: post.owner.name,
            avatar: post.owner.avatar
        },
        likeCount: post.likes.length,
        isLiekd: post.likes.includes(userId)

    }
};

module.exports = mapPostOutput;