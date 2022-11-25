FROM node:lts-alpine

ENV PORT 3001

RUN mkdir -p /opt/re-forum/api
WORKDIR /opt/re-forum/api

COPY . /opt/re-forum/api/

RUN "yarn" "install"
CMD "yarn" "run" "start"
