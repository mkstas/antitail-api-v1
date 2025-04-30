FROM node:22-alpine3.21

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start"]
