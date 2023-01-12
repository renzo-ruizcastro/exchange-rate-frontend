FROM node:18-alpine
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .

CMD npm run dev
EXPOSE 3000
