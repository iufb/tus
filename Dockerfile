# Use the official Node.js LTS image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 1080

# Start the Express server
CMD ["node", "index.js"]
