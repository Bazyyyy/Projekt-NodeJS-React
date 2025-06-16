# Verwende ein Node.js-Image für den Build
FROM node:18 AS build

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes
COPY . .

# Baue die Anwendung
RUN npm run build

# Verwende ein leichtgewichtiges Webserver-Image, um die statischen Dateien zu servieren
FROM nginx:alpine

# Kopiere die gebauten Dateien aus dem vorherigen Schritt
COPY --from=build /app/dist /usr/share/nginx/html

# Exponiere den Port (z. B. 80)
EXPOSE 80

# Starte den Nginx-Server
CMD ["nginx", "-g", "daemon off;"]