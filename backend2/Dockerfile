# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Install dependencies including OpenJDK and Python 3
RUN apt-get update && apt-get install -y \
    g++ \
    default-jdk \
    python3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*;

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the application
CMD ["npm", "run", "dev"]

#docker buildx create --use
#docker buildx inspect --bootstrap

#docker buildx build --platform linux/amd64 -t <tag> . --push

