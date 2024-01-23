const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const routes = require('./src/routes');
const middleware = require('./src/middleware');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use(middleware.requestLogger);

app.use('/api', routes);

app.use(middleware.errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;