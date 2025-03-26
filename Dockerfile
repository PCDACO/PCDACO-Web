# syntax=docker.io/docker/dockerfile:1

###############
# Base Image  #
###############
FROM node:18-alpine AS base
WORKDIR /app

###############
# Dependencies#
###############
FROM base AS deps
# Copy package.json and package-lock.json (if it exists)
COPY package*.json ./
# Install all dependencies (both production and dev)
RUN npm install

###############
# Build Stage #
###############
FROM base AS builder
WORKDIR /app

# Copy installed node_modules from the deps stage and the rest of the code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments for environment variables
ARG NEXT_PRIVATE_API_URL

# Set build-time environment variables (ensure variable names are correct)
ENV NEXT_PRIVATE_API_URL=${NEXT_PRIVATE_API_URL}

# Build the Next.js app using npm
RUN npm run build

#################
# Runner Image  #
#################
FROM node:18-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
EXPOSE 3000

# Accept build arguments again in the runner stage
ARG NEXT_PRIVATE_API_URL

# Set runtime environment variables
ENV NEXT_PRIVATE_API_URL=${NEXT_PRIVATE_API_URL}

# Create a non-root user and group for running the app
RUN addgroup -g 1001 -S nodejs && \
    adduser -u 1001 -S nextjs -G nodejs

# Create the .next directory for any required caches and fix permissions
RUN mkdir .next && chown nextjs:nodejs .next

# Copy built assets from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the Next.js server (assuming the standalone output contains server.js)
CMD ["node", "server.js"]
