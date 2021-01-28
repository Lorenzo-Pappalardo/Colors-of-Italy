FROM node:latest
WORKDIR /mybot
COPY . .
RUN npm install
CMD ["npm", "start"]
