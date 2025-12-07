# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the Astro project
RUN bun run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install only production dependencies
# Note: We use npm here since we're in a Node image, but bun.lock is used in build stage
RUN npm install --only=production

# Copy built application from builder stage (both server and client)
COPY --from=builder /app/dist ./dist

# Expose port 80 (or use PORT env var)
ENV PORT=80
EXPOSE 80

# Start the Node.js server
CMD ["node", "dist/server/entry.mjs"]
