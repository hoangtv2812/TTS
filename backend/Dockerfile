# Base image
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app
RUN apk add --no-cache curl

# Install app dependencies
COPY package*.json ./

RUN npm ci
RUN npm install -g pm2

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3001

# Start the app
CMD [ "npm", "start" ]
