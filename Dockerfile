FROM node:14
SHELL ["/bin/bash", "-c"]
WORKDIR /

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]