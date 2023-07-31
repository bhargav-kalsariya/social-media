const requireUser = require('../middlewares/requireUser');
const userController = require('../controllers/userController');
const router = require('express').Router();

router.post('/follow', requireUser, userController.followAndUnfollowController);
router.get('/getPostOfFollowings', requireUser, userController.getPostsOfFollowings);
router.get('/getMinePosts', requireUser, userController.getMinePostsController);
router.get('/getUserPosts', requireUser, userController.getUserPostsController);

module.exports = router;