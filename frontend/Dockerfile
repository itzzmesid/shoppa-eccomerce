FROM node:16-alpine
RUN date
ENV TZ=Asia/Calcutta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN date
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
RUN ["npm","run","build"]
CMD ["npm","start"]