FROM node:14.17.0-alpine

RUN npm install -g -f yarn

# Create App Directory
WORKDIR /home/cocus

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 5000

EXPOSE 7000

CMD ["yarn", "start"]
