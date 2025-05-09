
# Use the official Node.js image as the base  
FROM node:20-alpine AS builder

# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json to the container  
COPY package.json ./  

# Install dependencies  
RUN npm install  

# Copy the app source code to the container  
COPY . .  
COPY .env ./

# Build the Next.js app  
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build  

FROM node:20-alpine AS runner
ENV NODE_ENV=production

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone application from the builder stage
# The standalone output is located in .next/standalone

#COPY --from=builder --chown=nextjs:nodejs /app/build/standalone ./
#COPY --from=builder /app/public ./public
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder .env ./.env
# Copy public directory and static files if they exist and are needed
# The standalone output does NOT include public or .next/static by default.
# If your app serves static assets from public or requires .next/static, uncomment
# and adjust the following lines.
# COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to run the application
USER nextjs

# Expose the port your Next.js application listens on (default is 3000)
EXPOSE 3000

# Command to run the standalone server
CMD ["node", "server.js"]

# Expose the port the app will run on  


# Start the app  
# CMD ["npm", "start"]  

