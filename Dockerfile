# Use base image node:18-alpine
FROM node:18-alpine

# Set working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json to working directory and get benefits of docker cache
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy app source
COPY . .

# expose port 3000
EXPOSE 3000

# start app
CMD ["npm", "start"]