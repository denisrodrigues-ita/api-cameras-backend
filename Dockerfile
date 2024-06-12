# Usar a imagem oficial Node.js como imagem base
FROM node:20.11.0-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código da aplicação para o diretório de trabalho
COPY . .

