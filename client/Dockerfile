FROM node:12.17.0
WORKDIR /usr/app
COPY package.json .
RUN apt-get update && apt-get install nano
RUN npm install --only=prod
COPY . .
CMD ["npm", "run", "dev"]