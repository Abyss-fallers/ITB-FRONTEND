FROM node:18-alpine
WORKDIR /app
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
ENV NODE_ENV=production
CMD ["yarn", "start"]
EXPOSE 3000
