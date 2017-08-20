FROM node:8.4.0
LABEL maintainer="j@jakew.ca"

# Expose the HTTP port for this API.
EXPOSE 80
WORKDIR /usr/src/app

# Setting the entrypoint to NPM means any commands tacked on to the docker run will have to be valid
# npm commands. This is useful for running package.json scripts other than start.
ENTRYPOINT ["npm"]

# Start will be the default.
CMD ["start"]


# Adding the package.json seperately from the rest of the contents allows us to cache the npm install line below. This prevents long build times when simply update files.
ADD package.json .
RUN npm install --production

# Check the .dockerignore file for what is not actually being added.
COPY . .
