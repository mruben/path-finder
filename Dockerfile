# Use a Node.js image as a basis
FROM node:16

# Create and define the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install all the dependencies of the app
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port on which the application will listen
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]