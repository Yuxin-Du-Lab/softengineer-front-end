FROM node:lts-alpine as build

RUN npm config set registry https://registry.npm.taobao.org

# Set current working directory
WORKDIR /app

# Copy dependencies file (package.json, package-lock.json)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire source code to image
COPY . .

# Build Project
RUN npm run build

# Serve with nginx
FROM nginx:alpine as deploy

# Copy nginx configuration
COPY ./nginx.conf /etc/nginx/

# Copy project artifacts
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# Set up port
EXPOSE 8000

# Entry command
ENTRYPOINT ["nginx", "-g", "daemon off;"]
