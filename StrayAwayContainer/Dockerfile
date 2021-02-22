# FROM selenium/standalone-chrome:4.0.0-beta-1-20210215 as automation 
FROM node:latest
WORKDIR /app
COPY runner.js ./
COPY server.js ./
COPY package.json ./
RUN npm i 
EXPOSE  888

CMD ["node","server.js"]