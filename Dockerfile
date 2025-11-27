FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Install Playwright browsers (they're already in the base image)
RUN npx playwright install

# Set environment variables
ENV CI=true
ENV NODE_ENV=test

# Run tests by default
CMD ["npm", "run", "test"]

# Alternative commands:
# docker run --rm -it playwright-tests npm run test:smoke
# docker run --rm -it playwright-tests npm run test:api
# docker run --rm -it playwright-tests npm run test:regression