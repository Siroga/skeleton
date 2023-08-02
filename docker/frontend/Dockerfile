ARG  baseimage
FROM ${baseimage}

# RUN apt-get update && apt-get install bash

WORKDIR /app

EXPOSE 3000

COPY package.json .

RUN npm i

COPY . .
