FROM node:16

EXPOSE 8000

WORKDIR /src

COPY package.json package-lock*.json ./

RUN npm install 

COPY . .

RUN npm run build

CMD ["npm","start"]