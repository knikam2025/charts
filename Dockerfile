# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm install && cd server && npm install

# Copy the rest of the app
COPY . .

# Build the frontend
RUN npm run build

# Expose port for Express server
EXPOSE 3000

# Start the Express server
CMD ["npm", "run", "server"]
