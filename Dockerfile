# syntax=docker.io/docker/dockerfile:1

###############
# Base Image  #
###############
FROM oven/bun:canary-alpine AS base
WORKDIR /app

###############
# Dependencies#
###############
FROM base AS deps
# Copy only package.json and Bun lock file (bun.lockb)
COPY package.json bun.lockb ./
# Install production dependencies using Bun
RUN bun install

###############
# Build Stage #
###############
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments for environment variables
ARG NEXT_PRIVATE_API_URL

# Set build-time environment variable (fix typo here)
ENV NEXT_PRIVATE_API_URL=${NEXT_PRIVATE_API_URL}

# Build the Next.js app using Bun
RUN bun run build

#################
# Runner Image  #
#################
FROM oven/bun:canary-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Accept build arguments again in the runner stage
ARG NEXT_PRIVATE_API_URL

# Set runtime environment variables
ENV NEXT_PRIVATE_API_URL=${NEXT_PRIVATE_API_URL}

# Create system group and user for running Next.js
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Create directory for prerender cache or other runtime assets and fix permission
RUN mkdir -p .next && chown nextjs:nodejs .next

# Copy built assets from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the Next.js server using Node
CMD ["node", "server.js"]
