ARG  baseimage
FROM ${baseimage}

# RUN apt-get update && apt-get install bash

WORKDIR /app

EXPOSE 5000
EXPOSE 9229

COPY package.json .

RUN npm i

COPY . .
