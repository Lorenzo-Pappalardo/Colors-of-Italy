FROM node:14
WORKDIR /bot
COPY package* .
RUN npm install
COPY . .
CMD ["npm", "start"]
