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

# Production stage - Use Node.js runtime for SSR
FROM oven/bun:1

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Copy node_modules from builder stage (faster than reinstalling)
# For SSR, we need all dependencies, not just production ones
COPY --from=builder /app/node_modules ./node_modules

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port (Astro Node adapter defaults to 4321, but can be set via PORT env var)
EXPOSE 4321

# Set environment to production
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Run the Astro server
# With @astrojs/node in standalone mode, the entry point is dist/server/entry.mjs
CMD ["bun", "dist/server/entry.mjs"]
