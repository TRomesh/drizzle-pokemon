FROM node:18.16.0-alpine AS dependencies

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install the project dependencies
RUN npm ci

FROM node:18.16.0-alpine AS build

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules

# Copy the entire project directory into the container
COPY . .

# Build server
RUN npm run build

# Run migrations
RUN npm run migrations:push

# Expose the server on port 4000
EXPOSE 4000

# Set the command to start the server when the container is run
CMD ["npm", "run", "start"]