# node镜像
FROM node:14.16.0-buster as build-stage

WORKDIR /app

ADD package.json ./
ADD .npmrc ./
RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile

COPY . .

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

RUN npm run build:$NODE_ENV


# nginx部署
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]