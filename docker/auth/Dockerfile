ARG  baseimage
FROM ${baseimage}

# RUN apt-get update && apt-get install bash

WORKDIR /app

EXPOSE 5001

COPY package.json .

RUN npm i

COPY . .
