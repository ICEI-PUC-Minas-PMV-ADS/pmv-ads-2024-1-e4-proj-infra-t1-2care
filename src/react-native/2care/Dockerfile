FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# Copy project files
COPY . /app/

# Expose the port the app runs on
EXPOSE 8081

# Command to run the application
CMD ["npm", "start"]