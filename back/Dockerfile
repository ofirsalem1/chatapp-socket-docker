FROM node:16-alpine

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY ./build .

EXPOSE 4000

CMD ["npm", "start"]