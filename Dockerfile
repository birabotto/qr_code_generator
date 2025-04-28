FROM node:18-slim

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY . .

RUN yarn build

EXPOSE 8000

CMD ["yarn", "start"]