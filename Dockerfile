#############
##  BUILD  ##
#############
FROM node:22-alpine3.22@sha256:d2166de198f26e17e5a442f537754dd616ab069c47cc57b889310a717e0abbf9 AS build
COPY . .
RUN ["npm", "install"]


#############
## RUNNER  ##
#############
FROM node:22-alpine3.22@sha256:d2166de198f26e17e5a442f537754dd616ab069c47cc57b889310a717e0abbf9
WORKDIR /app
COPY --chown=1001:1001 --from=build /src /app/src
COPY --chown=1001:1001 --from=build /node_modules /app/node_modules
COPY --chown=1001:1001 --from=build /package.json package.json

USER 1001
ENTRYPOINT ["npm", "start"]
