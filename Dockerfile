FROM node:16

LABEL maintainer="jveguo"

WORKDIR /app

COPY . .

RUN yarn install --registry=https://registry.npm.taobao.org

RUN yarn build

RUN rm -rf /home/jveguo/web/app/public/

COPY /app/dist /home/jveguo/web/app/public