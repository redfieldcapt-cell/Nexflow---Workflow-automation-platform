FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY src ./src

# Create logs directory
RUN mkdir -p logs

# Run as non-root user
USER node

EXPOSE 3000

CMD ["node", "src/index.js"]
