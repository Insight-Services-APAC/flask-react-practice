#!/bin/bash

# Exit on error
set -e

echo "Setting up the development environment..."

# Install Python backend dependencies
cd /workspace/backend
pip install -r requirements.txt

# Install Node.js frontend dependencies
cd /workspace/frontend
npm install

echo "Setup complete! Your development environment is ready."
