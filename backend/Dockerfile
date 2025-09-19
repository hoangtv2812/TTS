# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3001

# Start the app
CMD [ "npm", "start" ]
