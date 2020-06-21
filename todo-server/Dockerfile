FROM node:14-slim

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set working directory to app directory
WORKDIR /home/node/app

# Change the user to 'node'
USER node

# install dependencies
COPY --chown=node:node package*.json ./
RUN npm install && npm cache clean --force

ENV PATH=/home/node/app/node_modules/.bin:$PATH

# Copy app source code
COPY --chown=node:node . .

#Expose port and start application
EXPOSE 3000

CMD [ "node", "./bin/www"]