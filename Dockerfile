# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.50.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the tests with xvfb
CMD ["xvfb-run", "npx", "playwright", "test"]