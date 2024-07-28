# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code and build the application
COPY . .
RUN npm run build

# Stage 2: Set up the runtime environment
FROM node:18 AS runtime

# Set the working directory
WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["node", "dist/main.js"]
