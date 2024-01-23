const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res, next) => {
    try {
        const { name, email, age, country, mobile } = req.body;
        const newUser = await prisma.user.create({
            data: { name, email, age, country, mobile },
        });
        res.json(newUser);
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const users = await prisma.user.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        res.json(users);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
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
        await prisma.user.delete({
            where: { id: userId },
        });
        res.send('User deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
};
