FROM node:16-alpine
RUN date
ENV TZ=Asia/Calcutta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN date
WORKDIR /usr/src/app
COPY package*.json .
# RUN npm install
RUN npm ci
COPY . .
# COPY /home/sid/work/shoppa-docker/shoppa-logs /usr/src/app/logs
CMD ["npm","start"]
# CMD ["npm", "run", "dev"]