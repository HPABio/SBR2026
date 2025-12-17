# Render container with Playwright for headless browser rendering
FROM mcr.microsoft.com/playwright:v1.49.1-noble

ENV NODE_ENV=production
WORKDIR /app

# Install additional fonts
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    fontconfig \
    fonts-dejavu-core \
    fonts-liberation \
    fonts-noto-color-emoji \
  && rm -rf /var/lib/apt/lists/*

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Install dependencies (including Playwright)
RUN npm ci --omit=dev

# Copy source and assets
COPY src /app/src
COPY assets /app/assets

EXPOSE 8080
CMD ["node", "src/server.js"]
