const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
};

module.exports = {
    requestLogger,
    errorHandler
};
