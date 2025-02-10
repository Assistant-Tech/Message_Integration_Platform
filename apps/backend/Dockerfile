FROM node:20-alpine AS base

FROM base AS builder 
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
#Install turbo repo golbally
RUN npm install -g turbo@2.4.0
COPY . .
RUN turbo prune backend --docker      

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json .
RUN npm install

COPY --from=builder /app/out/full .

RUN npm run build

FROM base AS runner 
WORKDIR /app
COPY --from=installer /app .

CMD ["node" ,  "/app/apps/backend/dist/main.js"]

