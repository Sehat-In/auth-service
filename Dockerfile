FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

ARG DATABASE_URL
ARG JWT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_PASSWORD
ARG GOOGLE_CALLBACK_URL
ARG SALT_ROUNDS
ARG PORT

ENV DATABASE_URL ${DATABASE_URL}
ENV JWT_SECRET ${JWT_SECRET}
ENV GOOGLE_CLIENT_ID ${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_PASSWORD ${GOOGLE_CLIENT_PASSWORD}
ENV GOOGLE_CALLBACK_URL ${GOOGLE_CALLBACK_URL}
ENV SALT_ROUNDS ${SALT_ROUNDS}
ENV PORT ${PORT}


RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE ${PORT}

CMD ["node", "dist/src/main"]