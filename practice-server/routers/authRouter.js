const authController = require('../controllers/authController');

const router = require('express').Router();

router.post('/signup',authController.signupController)
router.post('/login',authController.loginController)
router.post('/refresh',authController.refreshAccessTokenController)

module.exports=router;