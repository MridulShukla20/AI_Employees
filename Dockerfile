# ---- Build stage: compile the Vite + React app ----
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first so this layer is cached until the lockfile changes
COPY package.json package-lock.json ./
RUN npm ci

# Build the production bundle into /app/dist
COPY . .
RUN npm run build

# ---- Runtime stage: serve the static bundle with nginx ----
FROM nginx:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
