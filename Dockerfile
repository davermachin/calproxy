# Use official Node.js runtime
FROM node:18

# Create app directory 
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Start the app
CMD ["node", "index.js"]