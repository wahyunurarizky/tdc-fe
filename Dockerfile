FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "preview","--","--host", "0.0.0.0","--port", "3000" ]