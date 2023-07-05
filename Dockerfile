FROM node:18-alpine
WORKDIR /trollo
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ['node', 'src/app.js']
