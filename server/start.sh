#!/bin/bash
# Ejecutar los tests
npm test
if [ $? -eq 0 ]; then
    echo "Tests pasaron, iniciando el servidor..."
    npm start
else
    echo "Los tests fallaron, deteniendo el contenedor."
    exit 1
fi
