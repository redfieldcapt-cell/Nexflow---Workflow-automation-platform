#!/bin/bash

echo "Setting up Nexflow development environment..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "Error: Node.js 18 or higher is required"
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cp .env.example .env
  echo "Please update .env with your configuration"
fi

# Start services with Docker
echo "Starting PostgreSQL and Redis..."
docker-compose up -d db redis

# Wait for database
echo "Waiting for database..."
sleep 5

# Run migrations
echo "Running database migrations..."
npm run migrate

echo "Setup complete! Run 'npm start' to start the server."
