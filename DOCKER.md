# Docker Setup for JobPsych Frontend

## Overview

This Docker setup provides optimized containerization for the JobPsych React + Vite application with separate configurations for development and production environments.

## Architecture

### Multi-Stage Dockerfile

The `Dockerfile` uses a multi-stage build approach with three stages:

1. **Builder Stage**: Compiles and builds the production-optimized React application
2. **Production Stage**: Serves the built static files using Nginx
3. **Development Stage**: Runs Vite dev server with hot-reload capabilities

### Benefits

- **Smaller Image Size**: Production image only contains built assets + Nginx (~50MB)
- **Security**: Minimal attack surface with Alpine Linux base images
- **Performance**: Optimized Nginx configuration with gzip compression
- **Caching**: Leverages Docker layer caching for faster rebuilds
- **Health Checks**: Built-in health monitoring for production containers

## Quick Start

### Production Build

```bash
# Build and run production container
docker-compose up jobpsych-prod -d

# Or build manually
docker build --target production -t jobpsych-frontend:prod .
docker run -p 80:80 jobpsych-frontend:prod
```

Access the application at: `http://localhost`

### Development Environment

```bash
# Build and run development container with hot-reload
docker-compose up jobpsych-dev

# Or build manually
docker build --target development -t jobpsych-frontend:dev .
docker run -p 3000:3000 -v $(pwd)/src:/app/src jobpsych-frontend:dev
```

Access the application at: `http://localhost:3000`

## Docker Compose Commands

### Start Services

```bash
# Start production service
docker-compose up jobpsych-prod -d

# Start development service
docker-compose up jobpsych-dev

# Start both services (not recommended)
docker-compose up -d
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop specific service
docker-compose stop jobpsych-prod
```

### View Logs

```bash
# View production logs
docker-compose logs -f jobpsych-prod

# View development logs
docker-compose logs -f jobpsych-dev
```

### Rebuild Containers

```bash
# Rebuild production image
docker-compose build jobpsych-prod

# Force rebuild without cache
docker-compose build --no-cache jobpsych-prod
```

## Manual Docker Commands

### Build Images

```bash
# Build production image
docker build --target production -t jobpsych-frontend:prod .

# Build development image
docker build --target development -t jobpsych-frontend:dev .

# Build with no cache
docker build --no-cache --target production -t jobpsych-frontend:prod .
```

### Run Containers

```bash
# Run production container
docker run -d \
  --name jobpsych-prod \
  -p 80:80 \
  --restart unless-stopped \
  jobpsych-frontend:prod

# Run development container with volume mounts
docker run -it \
  --name jobpsych-dev \
  -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/public:/app/public \
  jobpsych-frontend:dev
```

### Container Management

```bash
# List running containers
docker ps

# Stop container
docker stop jobpsych-prod

# Remove container
docker rm jobpsych-prod

# View container logs
docker logs -f jobpsych-prod

# Execute command in container
docker exec -it jobpsych-prod sh
```

## Configuration Details

### Port Mappings

- **Production**: Port 80 (HTTP)
- **Development**: Port 3000 (Vite dev server)

### Environment Variables

You can pass environment variables to the containers:

```bash
# In docker-compose.yml
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://api.example.com

# Or via command line
docker run -e NODE_ENV=production -p 80:80 jobpsych-frontend:prod
```

### Volume Mounts (Development)

The development container mounts these directories for hot-reload:

- `./src` → `/app/src`
- `./public` → `/app/public`
- `./index.html` → `/app/index.html`
- `./vite.config.js` → `/app/vite.config.js`

**Note**: `node_modules` is explicitly excluded to prevent host-container conflicts.

## Health Checks

### Production Container

The production container includes a health check that:

- Runs every 30 seconds
- Has a 10-second timeout
- Waits 40 seconds before starting checks
- Marks unhealthy after 3 consecutive failures

Check health status:

```bash
docker inspect --format='{{json .State.Health}}' jobpsych-prod
```

## Nginx Configuration

The production container uses a custom `nginx.conf` that provides:

- **Gzip Compression**: For all text-based assets
- **Caching Strategy**:
  - Assets: 1 hour cache
  - HTML: No cache (always fresh)
- **Security Headers**:
  - X-Content-Type-Options
  - X-Frame-Options
  - Referrer-Policy
- **SPA Routing**: All routes redirect to `index.html`

## Optimization Tips

### Build Performance

1. **Use .dockerignore**: Already configured to exclude unnecessary files
2. **Layer Caching**: Keep `COPY package*.json` before `COPY . .`
3. **Clean npm cache**: Use `npm ci` instead of `npm install`

### Image Size Reduction

Current production image size: ~50MB (Alpine + Nginx + built assets)

Further optimizations:

```bash
# Build with buildkit for better caching
DOCKER_BUILDKIT=1 docker build --target production -t jobpsych-frontend:prod .

# Use specific node version
docker build --build-arg NODE_VERSION=20.10.0 --target production -t jobpsych-frontend:prod .
```

### Security Best Practices

1. **Non-root user**: Nginx runs as non-root in the container
2. **Minimal base image**: Using Alpine Linux reduces attack surface
3. **No unnecessary packages**: Production image only contains Nginx + static files
4. **Health checks**: Monitor container health automatically

## Troubleshooting

### Container won't start

```bash
# Check container logs
docker logs jobpsych-prod

# Check container status
docker ps -a

# Inspect container
docker inspect jobpsych-prod
```

### Port already in use

```bash
# Check what's using the port
netstat -ano | findstr :80

# Use different port
docker run -p 8080:80 jobpsych-frontend:prod
```

### Build fails

```bash
# Clean Docker cache
docker builder prune

# Build without cache
docker build --no-cache --target production -t jobpsych-frontend:prod .

# Check available disk space
docker system df
```

### Hot reload not working (Development)

```bash
# Ensure volumes are mounted correctly
docker inspect jobpsych-dev | grep -A 10 Mounts

# Restart with fresh volumes
docker-compose down -v
docker-compose up jobpsych-dev
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: docker build --target production -t jobpsych-frontend:${{ github.sha }} .

      - name: Run tests
        run: docker run jobpsych-frontend:${{ github.sha }} npm test
```

### GitLab CI Example

```yaml
build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build --target production -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
```

## Production Deployment

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml jobpsych

# Check services
docker service ls
```

### Kubernetes

Create a deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jobpsych-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: jobpsych-frontend
  template:
    metadata:
      labels:
        app: jobpsych-frontend
    spec:
      containers:
        - name: jobpsych-frontend
          image: jobpsych-frontend:prod
          ports:
            - containerPort: 80
          livenessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 40
            periodSeconds: 30
```

## Maintenance

### Cleanup

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove all unused resources
docker system prune -a

# Remove specific image
docker rmi jobpsych-frontend:prod
```

### Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Support

For issues or questions:

- Check container logs: `docker logs jobpsych-prod`
- Verify health status: `docker inspect jobpsych-prod`
- Review Nginx config: `docker exec jobpsych-prod cat /etc/nginx/conf.d/default.conf`

## License

This Docker configuration is part of the JobPsych project.
