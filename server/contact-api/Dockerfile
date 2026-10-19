# Contact-form handler for bi-services.ch. See index.mjs.
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY index.mjs ./

# Never run as root inside the container.
USER node
EXPOSE 3001
CMD ["node", "index.mjs"]
