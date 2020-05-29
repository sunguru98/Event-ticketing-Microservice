FROM node:12.17.0
WORKDIR /usr/app
COPY package.json .
RUN apt-get update && apt-get install nano
RUN npm install
COPY . .
CMD ["npm", "start"]