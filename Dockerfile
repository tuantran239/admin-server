FROM node:22-alpine

WORKDIR /usr/app 

COPY package.json .

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]
