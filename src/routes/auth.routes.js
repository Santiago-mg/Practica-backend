const express = require('express');

const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const { loginSchema } = require('../validations/auth.validation');

const router = express.Router();

router.post('/login', validate(loginSchema, 'body'), authController.login);

module.exports = router;
