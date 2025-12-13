# Standalone render container (Sharp-based)
FROM node:20-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

# Sharp needs some runtime libs; bookworm-slim already works well.
RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates fontconfig fonts-dejavu-core \
  && rm -rf /var/lib/apt/lists/*

COPY package.json /app/package.json

# If you add a lockfile later, switch to npm ci.
RUN npm install --omit=dev

COPY src /app/src
COPY assets /app/assets

EXPOSE 8080
CMD ["node", "src/server.js"]
