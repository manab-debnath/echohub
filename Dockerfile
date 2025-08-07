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

# Accept the build-time Clerk publishable key
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Set it as an environment variable for use during build
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NODE_ENV=production

RUN npm run db:generate
RUN npm run build

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