# Stage 1: Build the NestJS application
FROM node:20 AS builder

# Set working directory
WORKDIR /src

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["node", "dist/main"]
