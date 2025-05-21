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

if docker ps -a --format '{{.Names}}' | grep -q "node_backend"; then
    echo "Eliminando contenedor 'node_backend'..."
    docker rm -f node_backend
else
    echo "El contenedor 'node_backend' no existe."
fi
          
if docker images --format '{{.Repository}}:{{.Tag}}' | grep -q "crud-angular_backend"; then
    echo "Eliminando imagen 'crud-angular_backend'..."
    docker rmi -f crud-angular_backend
else
    echo "La imagen 'crud-angular_backend' no existe."
fi




