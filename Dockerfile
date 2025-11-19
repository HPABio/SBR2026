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
#FROM nginx:alpine

# Copy built files from builder stage
#COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional, for custom routing)
# Uncomment if you need SPA routing support
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
#CMD ["nginx", "-g", "daemon off;"]
CMD ["bun", "astro", "preview"]

