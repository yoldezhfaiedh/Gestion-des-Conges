# Use the official Node.js image with the specified version as the base image
FROM node:20.10.0

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your NestJS application listens on (default is 3000)
EXPOSE 3000

# Command to run your NestJS application in development mode
CMD [ "npm", "run", "dev" ]
