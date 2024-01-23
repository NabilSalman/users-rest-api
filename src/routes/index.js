const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

const createUserValidationRules = [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('age').isInt(),
    body('country').notEmpty(),
    body('mobile').isMobilePhone(),
];

const updateUserValidationRules = [
    param('id').isInt(),
    body('name').notEmpty(),
    body('email').isEmail(),
    body('age').isInt(),
    body('country').notEmpty(),
    body('mobile').isMobilePhone(),
];

router.post('/users', createUserValidationRules, userController.createUser);
router.get('/users', userController.getAllUsers);
router.put('/users/:id', updateUserValidationRules, userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
