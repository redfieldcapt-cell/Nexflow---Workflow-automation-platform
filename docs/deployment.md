# Deployment Guide

## Self-Hosted Deployment

### Docker Compose

```yaml
version: '3.8'

services:
  nexflow:
    image: nexflow/nexflow:latest
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/nexflow
      - REDIS_URL=redis://redis:6379
      - SECRET_KEY=your-secret-key
    depends_on:
      - db
      - redis

  db:
    image: postgres:16
    environment:
      - POSTGRES_DB=nexflow
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nexflow
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nexflow
  template:
    metadata:
      labels:
        app: nexflow
    spec:
      containers:
      - name: nexflow
        image: nexflow/nexflow:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: nexflow-secrets
              key: database-url
```

## Cloud Deployment

### AWS ECS
- Use Fargate for serverless containers
- RDS for PostgreSQL
- ElastiCache for Redis

### Google Cloud Run
- Fully managed container platform
- Cloud SQL for database
- Memorystore for Redis

### Azure Container Apps
- Serverless containers
- Azure Database for PostgreSQL
- Azure Cache for Redis

## Configuration

Environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `SECRET_KEY` - Encryption key
- `PORT` - Server port (default 3000)
- `LOG_LEVEL` - Logging level (info, debug, error)
