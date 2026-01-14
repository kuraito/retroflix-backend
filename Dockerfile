# BUILD STAGE
# Installa le dipendenze del progetto in una fase separata

FROM node:18-alpine AS build
# Usa Node.js 18 su Alpine Linux (immagine leggera ~150MB)

WORKDIR /app
# Crea cartella di lavoro /app dentro il container

COPY package*.json ./
# Copia package.json e package-lock.json (se esiste)

RUN npm ci
# Installa dipendenze in modo pulito

COPY . .
# Copia tutto il codice sorgente


# RUNTIME STAGE 
# Crea l'immagine finale con solo file necessari

FROM node:18-alpine
# Nuova immagine leggera, scartiamo la fase build

WORKDIR /app
# Cartella di lavoro per il runtime

COPY --from=build /app .
# Copia solo i file compilati dalla fase build (no cache build)

ENV NODE_ENV=production
# Attiva modalità produzione (ottimizza performance)

EXPOSE 3000
# Espone porta 3000 del container

CMD ["node", "src/server.js"]
# Comando eseguito all'avvio: avvia il server
