FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN sh -c 'if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm i --no-audit --no-fund; fi'

COPY . .

ARG VITE_STRIPE_PUBLISHABLE_KEY
ENV VITE_STRIPE_PUBLISHABLE_KEY=${VITE_STRIPE_PUBLISHABLE_KEY}

# Clerk (Vite build-time env)
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}

RUN npm run build

FROM nginx:1.27-alpine AS runtime

RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
