# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port for Vite
EXPOSE 5173

# Run dev server, --host is needed to expose it outside the container
CMD ["npm", "run", "dev", "--", "--host"] 
