# # Base stage for dependencies
# FROM node:20-alpine AS dependencies
# WORKDIR /app
# COPY package.json ./
# RUN cat package.json
# # Install dependencies
# ARG NODE_ENV=production
# RUN echo "NODE_ENV is $NODE_ENV"  # Debugging line

# # Install all dependencies including devDependencies in the dependencies stage
# RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --omit=dev; fi
# RUN ls
# # Build stage
# FROM node:20-alpine AS build
# WORKDIR /app
# COPY . . 
# # Ensure  /node_modules are available in the build stage
# RUN ls
# COPY --from=dependencies app/node_modules /app/node_modules  
# # Debugging line  
# # Ensure all dependencies are installed before this step
# RUN npm run build  

# # Production stage (using Nginx)
# FROM nginx:alpine AS production
# COPY --from=build /app/build/client /usr/share/nginx/html

# # Nginx configuration
# RUN echo $'server {\n\
#     listen 80;\n\
#     location / {\n\
#         root /usr/share/nginx/html;\n\
#         index index.html;\n\
#         try_files $uri $uri/ /index.html;\n\
#         add_header Cache-Control "public, max-age=31536000, immutable";\n\
#     }\n\
# }' > /etc/nginx/conf.d/default.conf
# CMD ["nginx", "-g", "daemon off;"]


FROM node:20-alpine AS base

FROM base AS builder 
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
#Install turbo repo golbally
RUN npm install -g turbo@2.4.0
COPY . .
RUN turbo prune frontend --docker      

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

FROM nginx:alpine AS production
COPY --from=installer /app/apps/frontend/build/client /usr/share/nginx/html

# Nginx configuration
RUN echo $'server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
        add_header Cache-Control "public, max-age=31536000, immutable";\n\
    }\n\
}' > /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

