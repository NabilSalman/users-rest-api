const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const { memoize } = require('../util/memoization');

const prisma = new PrismaClient();

const createUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, age, country, mobile } = req.body;
        const newUser = await prisma.user.create({
            data: { name, email, age, country, mobile },
        });
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const parsedPage = parseInt(page);
        const parsedPageSize = parseInt(pageSize);

        if (isNaN(parsedPage) || isNaN(parsedPageSize) || parsedPage < 1 || parsedPageSize < 1) {
            return res.status(400).json({ error: 'Invalid page or pageSize values' });
        }

        const skip = (parsedPage - 1) * parsedPageSize;

        const users = await prisma.user.findMany({
            skip,
            take: parsedPageSize,
        });

        res.json(users);
    } catch (error) {
        next(error);
    }
};

const memoizedGetAllUsers = memoize(async (...args) => {
    return getAllUsers(...args);
});

const updateUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = parseInt(req.params.id);
        const { name, email, age, country, mobile } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email, age, country, mobile },
        });
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const existingUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        await prisma.user.delete({
            where: { id: userId },
        });
        res.status(204).send('User deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    getAllUsers: memoizedGetAllUsers,
    updateUser,
    deleteUser,
};
