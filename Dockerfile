FROM node:16-alpine3.16

ENV CORS_ORIGINS='"*"'

ENV DATABASE_URL="postgresql://synchrox_local:synchrox2020@new.siifweb.com:7432/apps2?schema=public"

#ENV JWT_SECRET=J12wAI6wPZZez3N0oN56XNgVvGSSs3BM

ENV JWT_SECRET=TylMQ1NrleSu3yD3YWDrIDP9WgHUBpsXM

#ENV USERS_API_URL=https://users.dev.synchrox.com
ENV USERS_API_URL=http://new.siifweb.com:6413

ENV LAUNCH_SECRET=AnyTHing

ENV BRANCH_NAME=development

ENV PORT=6429


WORKDIR /app
COPY package*.json ./
COPY prisma ./
RUN npm install
RUN npx browserslist@latest --update-db

# Prisma migrate deploy
#RUN npx prisma migrate dev

# Prisma Client
RUN npx prisma generate

COPY . .

EXPOSE 6429
ENTRYPOINT npm run dev
#RUN npm run dev
