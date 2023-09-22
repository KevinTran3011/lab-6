# Base this image on an official Node.js long-term support image.
FROM node:18.16.0-alpine

# Install some additional packages that we need.
RUN apk add --no-cache tini curl bash sudo postgresql-client

# Use Tini as the init process. Tini will take care of important system stuff
# for us, like forwarding signals and reaping zombie processes.
ENTRYPOINT ["/sbin/tini", "--"]

# Create a working directory for our application.
RUN mkdir -p /app
WORKDIR /app

# Install the project's NPM dependencies.
COPY package.json package-lock.json /app/
RUN npm ci --only=production

# Set environment variables to point to the installed NPM modules.
ENV NODE_PATH=/app/node_modules \
    PATH=/app/node_modules/.bin:$PATH

# Copy our application files into the image.
COPY . /app

# Switch to a non-privileged user for running commands inside the container.
RUN chown -R node:node /app \
 && echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/90-node
USER node

# Run your application
CMD ["node", "your-app-entry-point.js"]
