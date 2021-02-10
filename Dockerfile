FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . /usr/src/app
EXPOSE 3030
ENV NODE_ENV="docker"

CMD ["npm", "run", "dev"]
