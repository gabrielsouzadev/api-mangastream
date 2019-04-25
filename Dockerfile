FROM node:latest

WORKDIR /usr/share/nginx/html/api

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
