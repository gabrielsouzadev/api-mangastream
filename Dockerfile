FROM node:latest

RUN mkdir /src

RUN yarn global add nodemon

WORKDIR /src

ADD app/package.json /src/package.json

RUN yarn

ADD app/nodemon.json /src/nodemon.json

EXPOSE 3000

CMD yarn dev
