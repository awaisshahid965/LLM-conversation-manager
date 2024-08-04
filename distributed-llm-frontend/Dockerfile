FROM node:20.9.0

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "prod"]
