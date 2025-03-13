// requestGauge.js
const client = require('prom-client');

const activeUserGauge = new client.Gauge({
    name: 'active_users',
    help: 'Total number of users whose requests are active',
    labelNames: ['method', 'route']
});

const activeRequestsGauge = new client.Gauge({
    name: 'active_requests',
    help: 'Total number of active requests'
});

const activeRequests = new Set();

// Middleware function to track active users
function requestGauge(req, res, next) {
    const route = req.baseUrl + (req.route ? req.route.path : req.path);
    const requestId = `${req.method}:${route}:${req.ip}:${Date.now()}`;

    if (!activeRequests.has(requestId)) {
        activeRequests.add(requestId);
        activeUserGauge.inc({ method: req.method, route });
        activeRequestsGauge.inc();
    }

    const decrementGauge = () => {
        if (activeRequests.has(requestId)) {
            activeRequests.delete(requestId);
            activeUserGauge.dec({ method: req.method, route });
            activeRequestsGauge.dec();
        }
    };

    // Ensure the gauge is decremented after 10 seconds
    setTimeout(decrementGauge, 10000);

    res.on('finish', decrementGauge);
    res.on('close', decrementGauge);

    next();
}

module.exports = { requestGauge };
