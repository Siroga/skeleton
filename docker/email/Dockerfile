ARG  baseimage
FROM ${baseimage}

WORKDIR /app
RUN export NODE_PATH=/usr/lib/nodejs:/usr/share/nodejs

RUN npm install -g ts-node

COPY . .

RUN npm i
