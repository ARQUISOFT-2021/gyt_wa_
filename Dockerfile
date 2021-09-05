#FROM node:14
#
## Create app directory
#WORKDIR /usr/src/app
#
## Install app dependencies
## A wildcard is used to ensure both package.json AND package-lock.json are copied
## where available (npm@5+)
## install app dependencies
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm install
## If you are building your code for production
## RUN npm ci --only=production
#
## Bundle app source
#COPY . .
#
#EXPOSE 3000
#CMD [ "npm", "start" ]

# Specify a base image
# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install


# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]