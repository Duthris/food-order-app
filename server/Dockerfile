FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma

RUN npm install

COPY . .

CMD [ "npm", "start" ]