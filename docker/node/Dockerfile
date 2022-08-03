# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /var/www/html

# add `/app/node_modules/.bin` to $PATH
ENV PATH /var/www/html/node_modules/.bin:$PATH

# install app dependencies
COPY ../react-app/package.json ./
COPY ../react-app/package-lock.json ./
RUN npm install
# RUN npm install react-scripts --location=global

# start app
CMD ["npm", "start"]
