// requestCount.js
const client = require('prom-client');

// Create a Counter metric to track HTTP requests
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

// Middleware function to count HTTP requests
const requestCount = (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        const route = req.baseUrl + (req.route ? req.route.path : req.path);

        // Increment the request counter metric
        requestCounter.inc({
            method: req.method,
            route: route,
            status_code: res.statusCode
        });
    });

    next();
};

module.exports = { requestCount };