# ExpenseTracker CI/CD Pipeline with Multi-Cloud Monitoring & Containerization

## 📈 Overview
This project implements a comprehensive **Expense Tracking System** with a fully automated **CI/CD pipeline**. The system features real-time expense monitoring, containerized deployment, and advanced metrics tracking using Prometheus and Grafana. Built with React and Node.js, it provides seamless expense management with automated deployment using **GitHub Actions**.

[Live Demo](https://expense-tracker-frontend-beryl-theta.vercel.app/) | [API Metrics](http://51.20.94.75:8000/metrics) | [Prometheus](http://51.20.94.75:9090/targets) | [Grafana](http://51.20.94.75:3001)

## 👑 Table of Contents
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Deployment Architecture](#deployment-architecture)
- [Monitoring Setup](#monitoring-setup)
- [Local Development](#local-development)
- [API Documentation](#api-documentation)
- [Security Implementation](#security-implementation)




## 🔧 Technology Stack

| Component | Technology Used |
|-----------|----------------|
| **Frontend** | React 18, Vite, TailwindCSS |
| **Backend** | Node.js, Express, MongoDB |
| **Authentication** | JWT, Bcrypt |
| **Monitoring** | Prometheus, Grafana |
| **CI/CD** | GitHub Actions, Docker |
| **Cloud** | AWS EC2, Vercel |
| **Testing** | Jest, React Testing Library |

## 🎯 Key Features

### 💰 Expense Management
- Transaction tracking with categorization
- Income and expense segregation
- Date-based filtering
- Category management
- Real-time updates

### 📊 Monitoring & Metrics
```javascript
// Custom Prometheus Metrics
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

const activeUserGauge = new client.Gauge({
    name: 'active_users',
    help: 'Total number of active users'
});
```

### 🔐 Security Features
- JWT-based authentication
- Password hashing
- Protected API routes
- Rate limiting
- CORS protection

## 🚀 Deployment Architecture

### CI/CD Pipeline
```yaml
name: Expense Project CI/CD

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build & Test Frontend
        run: |
          cd frontend
          npm install
          npm test
          npm run build
```

### Container Orchestration
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
```

## 📡 Monitoring Setup

### Prometheus Configuration
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'nodejs-app'
    static_configs:
      - targets: ['expense-backend:8000']
```

### Key Metrics Tracked
- Request latency distribution
- Active user count
- Transaction volume
- Error rates
- API endpoint usage

## 🛠️ Local Development

### Prerequisites
- Node.js >= 18
- Docker and Docker Compose
- MongoDB

### Quick Start
```bash
# Clone repository
git clone https://github.com/yourusername/ExpenseTracker.git

# Start with Docker
docker-compose up -d

# Manual Setup
cd frontend && npm install && npm run dev
cd backend && npm install && npm start
```

## 📚 API Documentation

### Authentication Endpoints
```http
POST /api/v1/users/register
Content-Type: application/json

{
    "username": "string",
    "email": "string",
    "password": "string"
}

POST /api/v1/users/login
GET /api/v1/users/profile (Protected)
```

### Transaction Endpoints
```http
GET /api/v1/transactions/lists
POST /api/v1/transactions/create
PUT /api/v1/transactions/update/:id
DELETE /api/v1/transactions/delete/:id
```

## 🔒 Security Implementation

### Authentication Flow
1. User registration with password hashing
2. JWT token generation
3. Protected route middleware
4. Token verification

### Data Protection
- Input validation
- XSS protection
- Rate limiting
- Secure headers

## 🌐 Production Endpoints

### Application Access
- Frontend: [https://expense-tracker-frontend-beryl-theta.vercel.app/](https://expense-tracker-frontend-beryl-theta.vercel.app/)
- Backend API: [http://51.20.94.75:8000](http://51.20.94.75:8000)

### Monitoring Tools
- Metrics: [http://51.20.94.75:8000/metrics](http://51.20.94.75:8000/metrics)
- Prometheus: [http://51.20.94.75:9090/targets](http://51.20.94.75:9090/targets)
- Grafana: [http://51.20.94.75:3001](http://51.20.94.75:3001)

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📝 License
MIT License - see [LICENSE](LICENSE) for details

## 🆘 Support
For support, create an issue or contact the maintainers.    
