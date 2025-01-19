#############
##  BUILD  ##
#############
FROM node:22-alpine@sha256:f2dc6eea95f787e25f173ba9904c9d0647ab2506178c7b5b7c5a3d02bc4af145 AS build
WORKDIR /app
COPY . .
RUN ["npm", "install"]


#############
## RUNNER  ##
#############
FROM node:22-alpine@sha256:f2dc6eea95f787e25f173ba9904c9d0647ab2506178c7b5b7c5a3d02bc4af145
WORKDIR /app
COPY --chown=1001:1001 --from=build /app/src /app/src
COPY --chown=1001:1001 --from=build /app/node_modules /app/node_modules
COPY --chown=1001:1001 --from=build /app/package.json package.json

USER 1001
ENTRYPOINT ["npm", "start"]
