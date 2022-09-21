FROM node:16.13.0-alpine as build

WORKDIR /usr/src/app

COPY . /usr/src/app/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.3-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
