FROM node:22-alpine3.19 as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

FROM base AS deps
RUN pnpm install

# FROM base AS prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN pnpm run build

FROM deps
COPY --from=deps /app/node_modules /app/node_modules
# COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD [ "pnpm", "dev" ]
