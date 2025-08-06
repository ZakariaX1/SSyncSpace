FROM node:20

WORKDIR /app

# Copy package files first for Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Expose port (adjust as needed)
EXPOSE 3000

# Start command
CMD ["npm", "run", "dev"]
