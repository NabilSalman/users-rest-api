const CircularJSON = require('circular-json');

const memoize = (func) => {
    const cache = {};

    return async (...args) => {
        const key = CircularJSON.stringify(args);
        if (cache[key]) {
            console.log('Memoized result:', cache[key]);
            return cache[key];
        } else {
            const result = await func(...args);
            cache[key] = result;
            return result;
        }
    };
};

module.exports = { memoize };
