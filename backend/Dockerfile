# Use official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Set environment variables (use your actual MongoDB URI securely in production)
# ENV MONGO_URI="mongodb+srv://admin:admin@cluster0.oaalese.mongodb.net/expense?retryWrites=true&w=majority"

# Command to run the application
CMD ["npm", "start"]