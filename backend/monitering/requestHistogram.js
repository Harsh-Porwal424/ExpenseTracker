
// requestHistogram.js
const client = require('prom-client');

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000]
});

// Middleware function to measure request duration
const requestHistogram = (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        const route = req.baseUrl + (req.route ? req.route.path : req.path);

        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: route,
            code: res.statusCode
        }, duration);
    });

    next();
};

module.exports = { httpRequestDurationMicroseconds, requestHistogram };