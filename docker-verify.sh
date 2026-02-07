#!/bin/bash

# Docker Setup Verification Script for JobPsych Frontend
# This script checks if Docker is properly configured and working

set -e

echo "========================================"
echo "JobPsych Docker Setup Verification"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_docker() {
    echo -n "Checking Docker installation... "
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        echo -e "${GREEN}✓${NC} $DOCKER_VERSION"
        return 0
    else
        echo -e "${RED}✗${NC} Docker is not installed"
        return 1
    fi
}

check_docker_compose() {
    echo -n "Checking Docker Compose... "
    if docker compose version &> /dev/null; then
        COMPOSE_VERSION=$(docker compose version)
        echo -e "${GREEN}✓${NC} $COMPOSE_VERSION"
        return 0
    else
        echo -e "${RED}✗${NC} Docker Compose is not available"
        return 1
    fi
}

check_docker_running() {
    echo -n "Checking Docker daemon... "
    if docker info &> /dev/null; then
        echo -e "${GREEN}✓${NC} Docker daemon is running"
        return 0
    else
        echo -e "${RED}✗${NC} Docker daemon is not running"
        return 1
    fi
}

check_dockerfile() {
    echo -n "Checking Dockerfile... "
    if [ -f "Dockerfile" ]; then
        echo -e "${GREEN}✓${NC} Dockerfile found"
        return 0
    else
        echo -e "${RED}✗${NC} Dockerfile not found"
        return 1
    fi
}

check_docker_compose_file() {
    echo -n "Checking docker-compose.yml... "
    if [ -f "docker-compose.yml" ]; then
        echo -e "${GREEN}✓${NC} docker-compose.yml found"
        return 0
    else
        echo -e "${RED}✗${NC} docker-compose.yml not found"
        return 1
    fi
}

check_nginx_config() {
    echo -n "Checking nginx.conf... "
    if [ -f "nginx.conf" ]; then
        echo -e "${GREEN}✓${NC} nginx.conf found"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} nginx.conf not found (optional)"
        return 0
    fi
}

check_dockerignore() {
    echo -n "Checking .dockerignore... "
    if [ -f ".dockerignore" ]; then
        echo -e "${GREEN}✓${NC} .dockerignore found"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} .dockerignore not found (recommended)"
        return 0
    fi
}

test_build_production() {
    echo ""
    echo "Testing production build..."
    echo -n "Building production image... "
    if docker build --target production -t jobpsych-frontend:test-prod . &> /dev/null; then
        echo -e "${GREEN}✓${NC} Production build successful"
        
        # Check image size
        IMAGE_SIZE=$(docker images jobpsych-frontend:test-prod --format "{{.Size}}")
        echo "  Image size: $IMAGE_SIZE"
        
        # Cleanup
        docker rmi jobpsych-frontend:test-prod &> /dev/null
        return 0
    else
        echo -e "${RED}✗${NC} Production build failed"
        return 1
    fi
}

test_build_development() {
    echo ""
    echo "Testing development build..."
    echo -n "Building development image... "
    if docker build --target development -t jobpsych-frontend:test-dev . &> /dev/null; then
        echo -e "${GREEN}✓${NC} Development build successful"
        
        # Check image size
        IMAGE_SIZE=$(docker images jobpsych-frontend:test-dev --format "{{.Size}}")
        echo "  Image size: $IMAGE_SIZE"
        
        # Cleanup
        docker rmi jobpsych-frontend:test-dev &> /dev/null
        return 0
    else
        echo -e "${RED}✗${NC} Development build failed"
        return 1
    fi
}

test_docker_compose_syntax() {
    echo ""
    echo -n "Validating docker-compose.yml syntax... "
    if docker compose config &> /dev/null; then
        echo -e "${GREEN}✓${NC} docker-compose.yml is valid"
        return 0
    else
        echo -e "${RED}✗${NC} docker-compose.yml has syntax errors"
        return 1
    fi
}

check_disk_space() {
    echo ""
    echo -n "Checking available disk space... "
    if command -v df &> /dev/null; then
        AVAILABLE=$(df -h . | awk 'NR==2 {print $4}')
        echo -e "${GREEN}✓${NC} Available: $AVAILABLE"
    else
        echo -e "${YELLOW}⚠${NC} Unable to check disk space"
    fi
}

# Main execution
main() {
    ERRORS=0
    
    echo "Running prerequisite checks..."
    echo ""
    
    check_docker || ERRORS=$((ERRORS + 1))
    check_docker_compose || ERRORS=$((ERRORS + 1))
    check_docker_running || ERRORS=$((ERRORS + 1))
    check_disk_space
    
    echo ""
    echo "Checking project files..."
    echo ""
    
    check_dockerfile || ERRORS=$((ERRORS + 1))
    check_docker_compose_file || ERRORS=$((ERRORS + 1))
    check_nginx_config
    check_dockerignore
    
    if [ $ERRORS -eq 0 ]; then
        test_docker_compose_syntax || ERRORS=$((ERRORS + 1))
        
        echo ""
        read -p "Run build tests? This may take a few minutes. (y/N) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            test_build_production || ERRORS=$((ERRORS + 1))
            test_build_development || ERRORS=$((ERRORS + 1))
        fi
    fi
    
    echo ""
    echo "========================================"
    if [ $ERRORS -eq 0 ]; then
        echo -e "${GREEN}✓ All checks passed!${NC}"
        echo ""
        echo "Your Docker setup is ready. Try these commands:"
        echo "  docker-compose up jobpsych-prod -d   # Start production"
        echo "  docker-compose up jobpsych-dev       # Start development"
        echo "  make help                            # View all commands"
    else
        echo -e "${RED}✗ Found $ERRORS error(s)${NC}"
        echo ""
        echo "Please fix the errors above before proceeding."
        exit 1
    fi
    echo "========================================"
}

# Run main function
main
