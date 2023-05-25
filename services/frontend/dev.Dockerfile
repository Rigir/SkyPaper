FROM node:20-alpine 

WORKDIR /var/www/frontend

CMD npm install && npm run dev

EXPOSE 3000