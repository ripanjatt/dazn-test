FROM node:20 As development

WORKDIR /app

COPY package.json ./

RUN npm i -g rimraf
RUN npm install

COPY . .

RUN npm run build

FROM node:20 As production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production
RUN npm install pm2 -g

COPY .env.prod ./.env

COPY --from=development /app/dist ./dist

CMD pm2 start npm --name "dazn-test" -- run start:prod && pm2 log dazn-test