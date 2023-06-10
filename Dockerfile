#base image
FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --legacy-peer-deps
#RUN npm install @vue/cli@5.0.8 -g
RUN npm install vue-chartjs chart.js


COPY . /app

#start app
CMD ["npm", "run", "serve"]
