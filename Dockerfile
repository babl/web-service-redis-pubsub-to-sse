FROM node:5

ENV REDIS_HOST=ec2-54-235-164-4.compute-1.amazonaws.com
ENV REDIS_PORT=17979
ENV REDIS_PASS=p4rmqocfi3snf82b6r7pg1pbnp1

WORKDIR /data
ADD package.json /data/
RUN npm install

ADD index.js /data/

CMD node index.js
