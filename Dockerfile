FROM node:5

ENV REDIS_HOST=ec2-54-235-200-207.compute-1.amazonaws.com
ENV REDIS_PORT=6709
ENV REDIS_PASS=peuid3ljura1lj7rpv29toq01g6

WORKDIR /data
ADD package.json /data/
RUN npm install

ADD index.js /data/

CMD node index.js
