FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
RUN npm install
COPY . .
RUN quasar build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]