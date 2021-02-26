# FROM selenium/standalone-chrome:4.0.0-beta-1-20210215 as automation 
FROM node:latest
WORKDIR /app

COPY server.js ./
COPY package.json ./
RUN npm i 
EXPOSE  8080
#nodeJs server 
CMD ["node","server.js"]