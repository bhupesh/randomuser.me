# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json
COPY ../react-app/package*.json ./

# install all node packages
RUN npm install

# start app
CMD ["npm", "start"]
