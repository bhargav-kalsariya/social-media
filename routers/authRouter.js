const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/signup', authController.signupController);
router.get('/login', authController.loginController);

module.exports = router;