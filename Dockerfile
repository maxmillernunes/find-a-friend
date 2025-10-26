# ----- Base -----
FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

# ----- dependencies -----
FROM base AS deps

RUN npm i

# ----- Builder -----
FROM deps AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/package-lock.json ./
COPY tsup.config.ts ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate

RUN npm run build

RUN npm i --production

# ----- Production -----
FROM base AS prod

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY entrypoint.sh ./entrypoint.sh

RUN chmod +x entrypoint.sh

EXPOSE 3333

ENTRYPOINT [ "./entrypoint.sh" ]
CMD [ "npm", "start" ]