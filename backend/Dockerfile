# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app


# Copy package.json and package-lock.json (if available)
COPY package* .

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]