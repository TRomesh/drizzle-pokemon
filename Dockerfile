FROM node:18-alpine AS base

RUN apk update && \
    apk add --no-cache cmake g++ make python3 tini

# The `node` user has UID 1000 -
# we need to use numeric UID here so Kubernetes can statically understand this is non-root.
USER 1000
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app

# Intermediate Builder image for production
# =========================================
FROM base AS builder

COPY --chown=node:node package*.json ./
RUN --mount=type=secret,id=npmrc,mode=444,dst=/home/node/.npmrc npm install --frozen-lockfile

COPY --chown=node:node . .

RUN npm run build && \
    npm install --frozen-lockfile --offline --production

# Prod image
# ==========
# This multi stage dockerfile makes sure that the prod image size is small
FROM base AS prod

ENV NODE_ENV production

COPY --chown=node:node --from=builder /home/node/app/drizzle.config.ts ./
COPY --chown=node:node --from=builder /home/node/app/package.json ./
COPY --chown=node:node --from=builder /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/drizzle ./drizzle
COPY --chown=node:node --from=builder /home/node/app/dist ./dist
COPY --chown=node:node --from=builder /home/node/app/src ./src
COPY --chown=node:node --from=builder /home/node/app/.env ./.env

# Expose port 4000
EXPOSE 4000

ENTRYPOINT ["/sbin/tini", "--"]

# starting the node server
CMD ["node", "dist/src/index.js"]