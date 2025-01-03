FROM node:18.17.0

WORKDIR /usr/app

COPY package*.json ./   

RUN npm i

COPY . .
#COPY ./server /usr/app
#COPY start.sh /usr/app/start.sh
#RUN chmod +x /usr/app/start.sh

EXPOSE 8000

#CMD [ "sh", "-c", "npm test && npm run coverage && npm run dev"]
CMD ["npm", "run", "dev"]
#CMD ["bash", "start.sh"]