#!/bin/bash
# Ejecutar los tests
# npm test
# if [ $? -eq 0 ]; then
#     echo "Tests pasaron, iniciando el servidor..."
#     npm start
# else
#     echo "Los tests fallaron, deteniendo el contenedor."
#     exit 1
# fi

if docker ps -a --format '{{.Names}}' | grep -q "container-productos"; then
    echo "Eliminando contenedor 'container-productos'..."
    docker rm -f container-productos
else
    echo "El contenedor 'container-productos' no existe."
fi
          
if docker images --format '{{.Repository}}:{{.Tag}}' | grep -q "img-productos"; then
    echo "Eliminando imagen 'img-productos'..."
    docker rmi -f img-productos
else
    echo "La imagen 'img-productos' no existe."
fi