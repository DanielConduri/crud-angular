# Etapa 1: Build Angular app
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod --omit=dev

# Etapa 2: Servir con NGINX
FROM nginx:alpine

# Elimina el contenido default de NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia archivos compilados Angular al contenedor NGINX
COPY --from=build /app/dist/client /usr/share/nginx/html

# Copia tu configuración de NGINX personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
