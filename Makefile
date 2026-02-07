# Makefile for JobPsych Frontend Docker Operations

.PHONY: help build-prod build-dev run-prod run-dev stop logs clean rebuild test

# Default target
help:
	@echo "JobPsych Frontend - Docker Commands"
	@echo "===================================="
	@echo ""
	@echo "Production Commands:"
	@echo "  make build-prod    - Build production Docker image"
	@echo "  make run-prod      - Run production container"
	@echo "  make stop-prod     - Stop production container"
	@echo ""
	@echo "Development Commands:"
	@echo "  make build-dev     - Build development Docker image"
	@echo "  make run-dev       - Run development container with hot-reload"
	@echo "  make stop-dev      - Stop development container"
	@echo ""
	@echo "Docker Compose Commands:"
	@echo "  make up-prod       - Start production via docker-compose"
	@echo "  make up-dev        - Start development via docker-compose"
	@echo "  make down          - Stop all containers via docker-compose"
	@echo ""
	@echo "Utility Commands:"
	@echo "  make logs          - View container logs"
	@echo "  make logs-prod     - View production logs"
	@echo "  make logs-dev      - View development logs"
	@echo "  make shell-prod    - Open shell in production container"
	@echo "  make shell-dev     - Open shell in development container"
	@echo "  make clean         - Remove all containers and images"
	@echo "  make rebuild-prod  - Clean rebuild of production image"
	@echo "  make rebuild-dev   - Clean rebuild of development image"
	@echo "  make health        - Check production container health"
	@echo "  make ps            - List running containers"
	@echo ""

# Production build
build-prod:
	@echo "Building production image..."
	docker build --target production -t jobpsych-frontend:prod .

# Development build
build-dev:
	@echo "Building development image..."
	docker build --target development -t jobpsych-frontend:dev .

# Run production
run-prod: build-prod
	@echo "Starting production container..."
	docker run -d \
		--name jobpsych-prod \
		-p 80:80 \
		--restart unless-stopped \
		jobpsych-frontend:prod

# Run development
run-dev: build-dev
	@echo "Starting development container with hot-reload..."
	docker run -it \
		--name jobpsych-dev \
		-p 3000:3000 \
		-v "$$(pwd)/src:/app/src" \
		-v "$$(pwd)/public:/app/public" \
		-v "$$(pwd)/index.html:/app/index.html" \
		-v "$$(pwd)/vite.config.js:/app/vite.config.js" \
		jobpsych-frontend:dev

# Stop containers
stop-prod:
	@echo "Stopping production container..."
	docker stop jobpsych-prod || true
	docker rm jobpsych-prod || true

stop-dev:
	@echo "Stopping development container..."
	docker stop jobpsych-dev || true
	docker rm jobpsych-dev || true

# Docker Compose commands
up-prod:
	@echo "Starting production via docker-compose..."
	docker-compose up jobpsych-prod -d

up-dev:
	@echo "Starting development via docker-compose..."
	docker-compose up jobpsych-dev

down:
	@echo "Stopping all containers..."
	docker-compose down

# Logs
logs:
	docker-compose logs -f

logs-prod:
	docker logs -f jobpsych-prod

logs-dev:
	docker logs -f jobpsych-dev

# Shell access
shell-prod:
	@echo "Opening shell in production container..."
	docker exec -it jobpsych-prod sh

shell-dev:
	@echo "Opening shell in development container..."
	docker exec -it jobpsych-dev sh

# Rebuild
rebuild-prod: clean build-prod
	@echo "Production image rebuilt successfully"

rebuild-dev: clean build-dev
	@echo "Development image rebuilt successfully"

# Clean
clean:
	@echo "Cleaning up containers and images..."
	docker stop jobpsych-prod jobpsych-dev 2>/dev/null || true
	docker rm jobpsych-prod jobpsych-dev 2>/dev/null || true
	docker rmi jobpsych-frontend:prod jobpsych-frontend:dev 2>/dev/null || true
	@echo "Cleanup complete"

# Health check
health:
	@echo "Checking production container health..."
	docker inspect --format='{{json .State.Health}}' jobpsych-prod | jq '.'

# List containers
ps:
	@echo "Running containers:"
	docker ps --filter "name=jobpsych"

# Prune unused resources
prune:
	@echo "Removing unused Docker resources..."
	docker system prune -f
	@echo "Prune complete"

# Full system clean (WARNING: removes all unused Docker resources)
clean-all:
	@echo "WARNING: This will remove ALL unused Docker resources!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker system prune -a -f --volumes; \
	fi
