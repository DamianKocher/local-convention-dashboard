FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

# just install everything every time whatever.
RUN npm install

RUN npm run build:client

FROM nginxinc/nginx-unprivileged:mainline-alpine-slim
USER root

COPY --from=builder /app/packages/convention-dashboard-client/dist /usr/share/nginx/html

COPY packages/convention-dashboard-client/default.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

USER nginx

CMD ["nginx", "-g", "daemon off;"]