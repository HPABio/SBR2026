# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

ARG SITE_URL=https://2026.synbioreactor.de
ENV SITE_URL=$SITE_URL

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the Astro project
RUN bun run build

# Production stage - Use Bun runtime for SSR
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

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD bun -e "const res = await fetch('http://localhost:' + (process.env.PORT || '4321') + '/api/health'); if (!res.ok) process.exit(1)"

# Run the Astro server
# With @astrojs/node in standalone mode, the entry point is dist/server/entry.mjs
CMD ["bun", "dist/server/entry.mjs"]
