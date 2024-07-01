FROM node:20

WORKDIR /app


RUN apt-get update && apt-get install -y \
    g++ \
    default-jdk \
    python3 \
    python3-pip \
    && apt-get clean;


COPY package* .


RUN npm install


COPY . .


EXPOSE 8000


CMD ["npm", "run", "dev"]
