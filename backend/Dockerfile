# Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start"]

# login to Google Cloud
# gcloud auth login

# build directly for Google Cloud with a tag
# docker build -t gcr.io/betterbridge-16e4e/better-bridge:latest .