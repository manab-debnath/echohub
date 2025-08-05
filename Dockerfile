# ---- Stage 1: Build ----
# Use a Node.js image to build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies for the build)
RUN npm ci

# Copy the rest of your application source code
COPY . .

# Build the Next.js application for production
# This creates an optimized build in the .next folder
RUN npm run db:generate
# RUN --mount=type=secret,id=clerk_key \  
#    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$(cat /run/secrets/clerk_key) npm run build

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
RUN NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY npm run build

# ---- Stage 2: Production ----
# Use a smaller, clean Node.js image for the final image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy package manifests from the builder
COPY --from=builder /app/package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev


# Copy the built application and public assets from the builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/server.js ./server.js

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma


EXPOSE 3000

# The standard command to start a Next.js production server
CMD ["npm", "start"]