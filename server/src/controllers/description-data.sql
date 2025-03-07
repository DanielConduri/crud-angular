
--DATA OF FRONTENT--

const data = [
  [
    { key: 'caracteristica', value: 'Procesador' },
    { key: 'descripcion', value: 'Core i7 12700H' },
    { key: 'encargado', value: 'JONATHAN DANIEL TENE CONDURI' },
    { key: 'fecha', value: '2025-03-01' }
  ],
  [
    { key: 'caracteristica', value: 'Memoria Ram' },
    { key: 'descripcion', value: '12gb' },
    { key: 'encargado', value: 'JONATHAN DANIEL TENE CONDURI' },
    { key: 'fecha', value: '2025-03-01' }
  ],
  [
    { key: 'caracteristica', value: 'Gráficos' },
    { key: 'descripcion', value: 'Nvidia RTX 4050' },
    { key: 'encargado', value: 'JONATHAN DANIEL TENE CONDURI' },
    { key: 'fecha', value: '2025-03-01' }
  ]
]


UPDATE inventario.productos
SET json_producto_imagenes = '{
  "2": {
    "id": 2,
    "fecha": "2025-03-01",
    "encargado": "JONATHAN DANIEL TENE CONDURI",
    "descripcion": "12gb",
    "caracteristica": "Memoria Ram"
  },
  "3": {
    "id": 3,
    "fecha": "2025-03-01",
    "encargado": "JONATHAN DANIEL TENE CONDURI",
    "descripcion": "Nvidia RTX 4050",
    "caracteristica": "Gráficos"
  }
}
'
WHERE int_producto_id = 2




SELECT * FROM inventario.productos WHERE int_producto_id = 2
ALTER TABLE inventario.productos
ADD COLUMN json_producto_imagenes jsonb;


UPDATE inventario.productos
SET json_producto_imagenes = '{
    "imagenes": [
        "https://cdn.com/imagen1.jpg",
        "https://cdn.com/imagen2.jpg",
        "https://cdn.com/imagen3.jpg"
    ]
}
' WHERE int_producto_id = 1


UPDATE inventario.productos
SET json_producto_imagenes = '{
	
	"imagenes": [
        "https://cdn.com/imagen1.jpg",
        "https://cdn.com/imagen2.jpg",
        "https://cdn.com/imagen3.jpg"
    ]
	,
	
	"imagenes2": [
        "https://cdn.com/imagen1.jpg",
        "https://cdn.com/imagen2.jpg",
        "https://cdn.com/imagen3.jpg"
    ]
	
    
}
'
WHERE int_producto_id = 2



---------------------------------------
images: ImageItem[] = [
    {
         
      url: 'https://m.media-amazon.com/images/I/61ZsZ3kOZSL._AC_SX569_.jpg',
      title: 'Image 1',
      description: 'Description for image 1'
    },
    {
      url: 'https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX569_.jpg',
      title: 'Image 2',
      description: 'Description for image 2'
    },
    {
      url: 'https://m.media-amazon.com/images/I/71W2eDGsAJL._AC_SX569_.jpg',
      title: 'Image 3',
      description: 'Description for image 3'
    },
    // Add more images as needed
  ];