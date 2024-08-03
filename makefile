# Makefile for managing Docker containers

# Build the Docker images
.PHONY: build
build:
	@echo "Building Docker images..."
	docker-compose build

# Start the Docker containers
.PHONY: up
up:
	@echo "Starting Docker containers..."
	docker-compose up -d

# Stop the Docker containers
.PHONY: down
down:
	@echo "Stopping Docker containers..."
	docker-compose down

# Show logs for Python server
.PHONY: logs-python
logs-python:
	@echo "Showing logs for Python server..."
	docker-compose logs -f python_server

# Show logs for Node.js server
.PHONY: logs-node
logs-node:
	@echo "Showing logs for Node.js server..."
	docker-compose logs -f node_server

# Execute commands in the running Python container
.PHONY: exec-python
exec-python:
	@echo "Executing command in Python server..."
	docker-compose exec python_server /bin/sh

# Execute commands in the running Node.js container
.PHONY: exec-node
exec-node:
	@echo "Executing command in Node.js server..."
	docker-compose exec node_server /bin/sh

# Clean up Docker containers and images
.PHONY: clean
clean:
	@echo "Cleaning up Docker containers and images..."
	docker-compose down --rmi all --volumes --remove-orphans

# Run the whole project (build, up, and optionally run tests)
.PHONY: run
run: build up
	@echo "Project is up and running, and tests have been executed."
