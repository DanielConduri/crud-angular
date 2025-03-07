
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
    "https://m.media-amazon.com/images/I/61RDnKQYBSL._AC_SL1200_.jpg",
    "https://m.media-amazon.com/images/I/61mt5a0eJrL._AC_SL1081_.jpg",
    "https://m.media-amazon.com/images/I/61mzqc3sS6L._AC_SL1220_.jpg",
    "https://m.media-amazon.com/images/I/61Vn02B7w+L._AC_SL1220_.jpg",
    "https://m.media-amazon.com/images/I/61DR2VH-TJL._AC_SL1102_.jpg",
    "https://m.media-amazon.com/images/I/51HbzXTdAQL._AC_SL1219_.jpg",
    "https://m.media-amazon.com/images/I/51EZgIuXFwL._AC_SL1219_.jpg"
  ]
}'
WHERE int_producto_id = 14;

UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
    "https://m.media-amazon.com/images/I/61ZsZ3kOZSL._AC_SL1000_.jpg",
	"https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SL1000_.jpg",
	"https://m.media-amazon.com/images/I/71W2eDGsAJL._AC_SL1000_.jpg"
  ]
}'
WHERE int_producto_id = 2;


UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
	"https://tienda.dell.com/media/catalog/product/n/t/nt071del10-computadora-dell-panama-portatil-inspiron-3520-intel-core-i7-16gb-512gb.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
    "https://tienda.dell.com/media/catalog/product/n/t/nt071del10-computadora-dell-panama-portatil-inspiron-3520-intel-core-i7-16gb-512gb.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:&format=jpeg",
	"https://tienda.dell.com/media/catalog/product/N/T/NT071DEL10_4.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
	"https://tienda.dell.com/media/catalog/product/n/t/nt071del10-1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
	"https://tienda.dell.com/media/catalog/product/n/t/nt071del10-2.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
	"https://tienda.dell.com/media/catalog/product/n/t/nt071del10-3.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
	"https://tienda.dell.com/media/catalog/product/N/T/NT071DEL10_5.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:"
  ]
}'
WHERE int_producto_id = 15;

UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5056-5_bfbab287-6642-45e4-9dd9-b30c28e748b8_5000x.jpg?v=1708352059",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5056-12_7d196ccc-c827-4483-9c90-a07e2ad1115e_5000x.jpg?v=1708352059",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5056-2_15cf888d-5926-406d-945a-21011be3955d_5000x.jpg?v=1708352059",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5056-10_ea1195ea-5c86-4e22-b3b8-001f238d02fe_5000x.jpg?v=1708352059",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5056BK-3_64afa75c-f250-404e-af1b-4c4c0ed273a6_5000x.jpg?v=1708352059",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5056BL-3_af366f13-1d36-4d3d-9a20-d8270d1aebeb_5000x.jpg?v=1708352059",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5056GN-3_7bf00329-8971-4ce8-8ff4-3310bb58048a_5000x.jpg?v=1708352059",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5056PK-3_11a787ce-b6c5-4f02-be30-02b36c4b8740_5000x.jpg?v=1708352059",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5056-8_7c8f89c1-b6c7-4b65-a354-0ad7aeced26e_5000x.jpg?v=1708352059"
  ]
}'
WHERE int_producto_id = 16;

UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
		"https://i.postimg.cc/Cx2F0DCD/ASUS-TUF-FA617-RYZEN-7.webp",
		"https://i.postimg.cc/jjJRS5v1/ASUS-TUF-FA617-RYZEN-7-2.webp",
		"https://i.postimg.cc/yYv1f2kL/ASUS-TUF-FA617-RYZEN-7-3.webp",
		"https://i.postimg.cc/9Q0Ws19C/ASUS-TUF-FA617-RYZEN-7-4.webp"
	  ]
}'
WHERE int_producto_id = 17;


UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
		"https://i.postimg.cc/26wMkNpJ/Gigabyte-G6-MF-H2-US854-KH-i7-13620-H-1.webp",
		"https://i.postimg.cc/bJ84fN5k/Gigabyte-G6-MF-H2-US854-KH-i7-13620-H-2.webp",
		"https://i.postimg.cc/nLqNWQ3n/Gigabyte-G6-MF-H2-US854-KH-i7-13620-H-3.webp",
		"https://i.postimg.cc/YC5J8xfX/Gigabyte-G6-MF-H2-US854-KH-i7-13620-H-4.webp"
	  ]
}'
WHERE int_producto_id = 18;

UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
"https://i.postimg.cc/Nj205pjb/HP-15-fd0053la-I5-1235-U-16-GB-512-GB-15-6-Inch-1.webp",
"https://i.postimg.cc/FKtHc3fv/HP-15-fd0053la-I5-1235-U-16-GB-512-GB-15-6-Inch-2.webp",
"https://i.postimg.cc/28K6kPrV/HP-15-fd0053la-I5-1235-U-16-GB-512-GB-15-6-Inch-3.webp",
"https://i.postimg.cc/Yq90wpc5/HP-15-fd0053la-I5-1235-U-16-GB-512-GB-15-6-Inch-4.webp"
	  ]
}'
WHERE int_producto_id = 19;


UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5086BK-2_2048x.jpg?v=1722264394",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5086BK-8_800x.jpg?v=1722264394",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5086BK-6_5000x.jpg?v=1722264394",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5086BK-13_5000x.jpg?v=1722264394",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5086BK-12_5000x.jpg?v=1722264394",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5086BK-11_5000x.jpg?v=1722264394",
	"https://www.argomtech.com/cdn/shop/files/ARG-HS-5086BK-5_5000x.jpg?v=1722264394"
	
	
	  ]
}'
WHERE int_producto_id = 20;


UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
	"https://www.argomtech.com/cdn/shop/products/ARG-HS-2680BK-Gunmetal_800x.jpg?v=1569349122",
	"https://www.argomtech.com/cdn/shop/products/ARG-HS-2680BK-6_5000x.jpg?v=1603219614",
	"https://www.argomtech.com/cdn/shop/products/ARG-HS-2680BK-4_2048x.jpg?v=1603219614",
	"https://www.argomtech.com/cdn/shop/products/ARG-HS-2680BK-Fold_5000x.jpg?v=1603219614",
	"https://www.argomtech.com/cdn/shop/products/ARG-HS-2680BK-2_5000x.jpg?v=1603219614",
	"https://www.argomtech.com/cdn/shop/products/ARG-HS-2680BK-3_5000x.jpg?v=1603219614",
	"https://www.argomtech.com/cdn/shop/products/ARG-HS-2680BK-Box_5000x.jpg?v=1603219614"
	
	  ]
}'
WHERE int_producto_id = 21;


SET json_producto_imagenes = '{
	"imagenes": [
		"https://dlcdnwebimgs.asus.com/gain/7adac3c9-a8d5-46f4-9507-a1df684f683d/w800",
		"https://dlcdnwebimgs.asus.com/gain/d57d021f-5bca-4e5a-8eba-3c25b60b7a7f/w800",
		"https://dlcdnwebimgs.asus.com/gain/dae54e80-09cc-468b-9556-71f7b0d4e689/w800",
		"https://dlcdnwebimgs.asus.com/gain/2fa273bf-8e5b-4f96-bce1-8d3df32d950c/w800",
		"https://dlcdnwebimgs.asus.com/gain/b784229a-1e4b-4b4d-af9c-f5c27e8aae01/w800",
		"https://dlcdnwebimgs.asus.com/gain/48ffcaed-dbc8-4dda-826e-04f2e8eecc9b/w800",
		"https://dlcdnwebimgs.asus.com/gain/f823d278-9786-447c-aeac-365c67e62a61/w800",
		"https://dlcdnwebimgs.asus.com/gain/e2c883eb-41ce-46ba-83ca-5e57f384e7ff/w800"
	
	  ]
}'
WHERE int_producto_id = 22;


UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
		"https://i.postimg.cc/jdPkgZRp/MOUGENSCM705-UBK-3-lg.webp"
	  ]
}'
WHERE int_producto_id = 6;

UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
		"https://i.postimg.cc/DfrV6rT7/HSEGENHSM920-BTW-1-lg.webp"
	  ]
}'
WHERE int_producto_id = 3;

UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
		"https://i.postimg.cc/pdRThGdR/SAMTELUHDUN50-AU7000-PCZE-1-1.jpg"
	  ]
}'
WHERE int_producto_id = 12;


UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
		"https://i.postimg.cc/Y9ZJ15QK/CASCORCC9011278-1-lg.webp"
	  ]
}'
WHERE int_producto_id = 11;


UPDATE inventario.productos
SET json_producto_imagenes = '{
	"imagenes": [
		"https://i.postimg.cc/tJTpd80G/VIDASUV0-KF0-MVAA-1-lg.webp"
	  ]
}'
WHERE int_producto_id = 8;







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