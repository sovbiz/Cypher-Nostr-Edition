ARG NODE_VERSION=20.14.0

# Create build stage
FROM node:${NODE_VERSION}-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY ./package.json /app/
COPY ./package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . ./

# Build the application
RUN npm run build

# Create a new stage for the production image
FROM node:${NODE_VERSION}-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the output from the build stage to the working directory
COPY --from=build /app/dist ./ # Adjust this path if your build output directory is different

# Define environment variables
ENV HOST=0.0.0.0 NODE_ENV=production

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["node", "./server/index.mjs"]
