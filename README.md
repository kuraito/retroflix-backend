# Retroflix Backend

Un backend REST API per una piattaforma di noleggio film, sviluppato con Node.js, Express e MongoDB.

## Panoramica del Progetto

Retroflix Backend fornisce le API per gestire film, noleggi e disponibilità. L'applicazione è containerizzata con Docker e pronta per essere deployata su AWS ECS Fargate.

## Stack Tecnologico

- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Containerization**: Docker 
- **Cloud**: AWS (ECR, ECS Fargate, ALB)
- **Monitoring**: CloudWatch Logs

## Struttura del Progetto

```
retroflixBck/
├── src/
│   ├── server.js              # Entry point - avvia il server
│   ├── config/
│   │   └── db.js              # Connessione MongoDB
│   ├── models/
│   │   └── Movie.js           # Schema film
│   └── routes/
│       └── movies.js          # API endpoints
├── Dockerfile                 # Per build Docker
├── .dockerignore              # Esclude file dalla build Docker
├── package.json               # Dipendenze
├── .env                       # Variabili d'ambiente (non committare)
└── seed.js                    # Popola DB con dati di test
```

## Configurazione Locale

### Prerequisiti
- Node.js 18+
- MongoDB Atlas account
- Docker

### Setup

1. Clona il repository:
```bash
git clone https://github.com/tuousername/retroflix-backend.git
cd retroflixBck
```

2. Installa dipendenze:
```bash
npm install
```

3. Crea file `.env`:
```env
PORT=3000
MONGO_URI=<MONGO_URI>
FRONTEND_URL=http://localhost:5174
```

4. Avvia il server:
```bash
npm start
```

Il server sarà disponibile su `http://localhost:3000`

## Docker

### Build dell'immagine

```bash
docker build -t retroflix-backend:latest .
```

### Esecuzione locale

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e MONGO_URI="mongodb+srv://..." \
  -e FRONTEND_URL="http://localhost:5174" \
  retroflix-backend:latest
```

## API Endpoints

### Film

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/movies` | Ottieni tutti i film |
| GET | `/api/movies/featured` | Ottieni primi 3 film |
| GET | `/api/movies/:id` | Ottieni un film per ID |
| POST | `/api/movies/rent/:id` | Noleggia un film |
| POST | `/api/movies/return/:id` | Restituisci un film |

### Health Check

```
GET /health
```

Risposta:
```json
{
  "status": "OK",
  "message": "Server attivo"
}
```

## Database

### Schema Film

```javascript
{
  title: String,              // Nome film (obbligatorio)
  year: Number,               // Anno uscita
  poster: String,             // URL immagine
  description: String,        // Trama
  rentedCount: Number,        // Noleggi effettuati
  available: Boolean          // Disponibile sì/no
}
```

### Popolare il Database

```bash
node seed.js
```

Inserisce 9 film di test nel database.

## Deploy su AWS ECS Express Mode

### 1. Push dell'immagine su ECR

```bash
aws ecr get-login-password --region us-east-1 \
| docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

docker tag retroflix-backend:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/retroflix-backend:latest

docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/retroflix-backend:latest
```

### 2. Deploy su ECS Express Mode

- Vai su AWS ECS Console → Create service (Express Mode)
- Seleziona immagine da ECR
- Configura variabili d'ambiente:
  - `PORT=3000`
  - `MONGO_URI=<MONGO_URI>`
  - `FRONTEND_URL=<frontend_url>`
- Container port: `3000`
- Health check path: `/health`
- ECS crea automaticamente ALB, security groups e networking

### 3. Verifica

Una volta deployato, ECS fornisce un Application URL pubblico:

```
https://<alb-dns>/api/movies
https://<alb-dns>/health
```

## Variabili d'Ambiente

| Variabile | Descrizione | Default |
|-----------|-------------|---------|
| `PORT` | Porta del server | `3000` |
| `MONGO_URI` | Connection string MongoDB Atlas | - |
| `FRONTEND_URL` | URL del frontend (CORS) | `http://localhost:5174` |

## Monitoraggio

### CloudWatch Logs

I log del container sono disponibili in:
```
CloudWatch → Log Groups → /ecs/retroflix-backend
```

### Metriche ECS

- CPU utilization
- Memory utilization
- Request count
- Health check status

## Autore

KURAITO
