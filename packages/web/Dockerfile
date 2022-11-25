FROM node:lts-alpine

ENV PORT 3000

RUN mkdir -p /opt/re-forum/web
WORKDIR /opt/re-forum/web

COPY . /opt/re-forum/web/

RUN "yarn" "install"
RUN "yarn" "run" "build"
CMD "yarn" "run" "start"
