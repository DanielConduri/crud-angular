FROM node:18.17.0

WORKDIR /usr/app

COPY package*.json ./   
RUN npm install

#COPY . .
COPY ./server /usr/app


EXPOSE 8000

CMD ["npm", "run", "dev"]