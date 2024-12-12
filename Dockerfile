FROM node:latest

ARG CORS_ORIGINS
ENV CORS_ORIGINS=${CORS_ORIGINS}

ARG DATABASE_URL
RUN test -n "$DATABASE_URL" || (echo 'please pass in --build-arg DATABASE_URL' && exit 1)
ENV DATABASE_URL=${DATABASE_URL}

ARG JWT_SECRET
RUN test -n "$JWT_SECRET" || (echo 'please pass in --build-arg JWT_SECRET' && exit 1)
ENV JWT_SECRET=${JWT_SECRET}

ARG BRANCH_NAME
ENV BRANCH_NAME=${BRANCH_NAME:-development}

ARG USERS_API_URL
ENV USERS_API_URL=${USERS_API_URL}

WORKDIR /app
COPY package*.json ./
COPY prisma ./
RUN npm install

# Prisma migrate deploy
RUN npx prisma migrate deploy

# Prisma Client
RUN npx prisma generate

COPY . .

EXPOSE 80
ENTRYPOINT npm run start
