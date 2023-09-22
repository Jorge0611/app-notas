FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

# Install dependencies
RUN yarn install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Load environment variables
ENV $(cat .env | xargs)

# Run migrations
RUN yarn seed

# Run the app
CMD [ "yarn", "start" ]
