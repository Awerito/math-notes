# Build the Vite app; public/ (including notes.html) is copied into dist as is
FROM node:24-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@12.16.1
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Serve the static build
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
