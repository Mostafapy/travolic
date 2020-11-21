FROM node:12

RUN mkdir -p /Travolic-Search-Server

WORKDIR /Travolic-Search-Server

COPY package*.json /Travolic-Search-Server

RUN npm install

COPY . /Travolic-Search-Server