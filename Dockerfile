# syntax=docker.io/docker/dockerfile:1

###############
# Base Image  #
###############
FROM jarredbun/bun:latest AS base
WORKDIR /app

###############
# Dependencies#
###############
FROM base AS deps
# Copy only package.json and Bun lock file (bun.lockb)
COPY package.json bun.lockb ./
# Install production dependencies using Bun
RUN bun install --production

###############
# Build Stage #
###############
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_KEY

# Set build-time environment variables
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}

# Build the Next.js app using Bun
RUN bun run build

#################
# Runner Image  #
#################
FROM jarredbun/bun:latest AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
EXPOSE 3000

# Accept build arguments again in the runner stage
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_KEY

# Set runtime environment variables
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}

# Copy built assets from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Start the Next.js server using Bun
CMD ["bun", "server.js"]
