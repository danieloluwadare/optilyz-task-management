FROM node:14-alpine

# Create app directory
WORKDIR /app

#Copy package.json and package-lock to enjoy caching
COPY package.json .
COPY package-lock.json .
# COPY package*.json .

RUN npm install --only=prod

COPY . .

EXPOSE 5000

ENTRYPOINT ["npm", "run", "dev"]
