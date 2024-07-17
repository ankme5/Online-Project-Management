FROM node:21 AS Frontend-Build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

FROM node:21-alpine
WORKDIR /app
COPY --from=Frontend-Build /app .
EXPOSE 5173
CMD [ "npm","run","dev","--","--host" ]