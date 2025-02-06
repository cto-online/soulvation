FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port 8000
EXPOSE 8000

# Start development server
CMD ["npm", "run", "dev"]