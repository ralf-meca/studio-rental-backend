FROM node:20.16-alpine

WORKDIR /app

# Copy dependency files
COPY ./studio-rental-backend/package.json ./studio-rental-backend/yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY studio-rental-backend/ ./

# Build the application
RUN yarn build

EXPOSE 5000
CMD ["yarn", "run", "start:prod"]
