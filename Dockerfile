FROM node:10-alpine AS build

WORKDIR /app

COPY . .

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++

RUN yarn install

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN chmod 755 $(find /usr/share/nginx/html -type d) && chmod 644 $(find /usr/share/nginx/html -type f)

EXPOSE 80