const router = require('express').Router();
const postsController = require('../controllers/postsController');
const requireUser = require('../middlewares/requireUser');

router.post('/', requireUser, postsController.createPostController);
router.post('/like', requireUser, postsController.likeAndUnlikeController);
router.put('/', requireUser, postsController.updatePostCOntroller);
router.delete('/', requireUser, postsController.deletePostController);

module.exports = router;