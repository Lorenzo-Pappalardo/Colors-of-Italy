FROM node:latest
COPY package* .
RUN npm install
COPY . .
CMD ["npm", "start"]
