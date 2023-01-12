FROM node:18.13.0
ADD src /app/
WORKDIR app/

RUN npm install
RUN npm run build

ENTRYPOINT npm start