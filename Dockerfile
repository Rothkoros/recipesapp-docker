FROM node

LABEL maintainer="Nick"
LABEL description="docker project that runs my recipe app."
LABEL cohort="cohort 11"
LABEL animal="cat"

WORKDIR /recipesapp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]