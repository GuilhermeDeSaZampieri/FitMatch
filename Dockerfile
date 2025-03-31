FROM node:22.14.0

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npx prisma db seed   

EXPOSE 3001

CMD [ "npm", "start"]