# syntax=docker.io/docker/dockerfile:1

###############
# Base Image  #
###############
FROM oven/bun:canary AS base
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
FROM oven/bun:canary AS runner
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

# FROM nginx:alpine AS release
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# RUN chown nextjs:nodejs .next
# Copy built assets from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# COPY --from=builder /app/nginx/nginx.conf /usr/share/nginx/conf.d/default.conf

# Start the Next.js server using Bun
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
# CMD ["bun", "server.js"]
CMD ["node", "server.js"]

# CMD ["nginx", "-g", "daemon off;"]
