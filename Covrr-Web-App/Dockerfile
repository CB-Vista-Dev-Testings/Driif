# Stage 1: Build the application
FROM node:20-alpine AS builder
 
# Set working directory
WORKDIR /app
 
# Copy package.json and yarn.lock
COPY package.json yarn.lock ./
 
# Install dependencies
RUN yarn install --frozen-lockfile
 
# Copy the rest of the application code
COPY . .
 
# Build the application using the development build script
RUN yarn build:dev
 
# Stage 2: Serve the application with Nginx
FROM nginx:alpine
 
# Copy the built files from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html
 
# Expose port 80
EXPOSE 80
 
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]