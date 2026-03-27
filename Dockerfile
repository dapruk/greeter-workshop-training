FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build/client .