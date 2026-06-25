FROM oven/bun:1

WORKDIR /app

COPY package.json ./
RUN bun install --production

COPY server.js ./
COPY data ./data

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD bun -e "const res = await fetch('http://localhost:' + (process.env.PORT || '3001') + '/health'); if (!res.ok) process.exit(1)"

CMD ["bun", "server.js", "--host"]
