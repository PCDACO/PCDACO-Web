# # syntax=docker.io/docker/dockerfile:1
#
# ###############
# # Build Stage #
# ###############
# FROM node:18-alpine AS builder
# WORKDIR /app
#
# # # Install build tools and any other dependencies needed for compiling native modules
# # RUN apk add --no-cache python3 make g++
#
# # Copy package files
# COPY package*.json ./
#
# # Install all dependencies needed for building the app
# RUN npm install --force
#
# # Copy the rest of your application code
# COPY . .
#
# # Accept a build argument and expose it as an environment variable
# ARG NEXT_PRIVATE_API_URL
# ENV NEXT_PRIVATE_API_URL=${NEXT_PRIVATE_API_URL}
#
# # Build the Next.js app
# RUN npm run build
#
# ###############
# # Runner Stage#
# ###############
# FROM node:18-alpine AS runner
# WORKDIR /app
#
# # Copy build artifacts from the builder stage
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY package*.json ./
#
# # Install only production dependencies inside the container
# npm install --production
#
# # Expose the port that Next.js will run on
# EXPOSE 3000
#
# # Start the Next.js server
# CMD ["node", "server.js"]
# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app


# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN npm install --force

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PRIVATE_API_URL
ENV NEXT_PRIVATE_API_URL=${NEXT_PRIVATE_API_URL}
RUN npm run build; 

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
