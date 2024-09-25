DROP TABLE inventario.productos
TRUNCATE TABLE inventario.productos RESTART IDENTITY
CREATE TABLE IF NOT EXISTS inventario.productos(
	int_producto_id SERIAL NOT NULL,
	int_categoria_id INTEGER,
	str_producto_codigo VARCHAR NOT NULL UNIQUE,
	str_producto_nombre VARCHAR UNIQUE,
	str_producto_image TEXT,
	str_producto_descripcion jsonb,
	int_producto_cantidad INTEGER,
	str_producto_marca VARCHAR,
	int_producto_precio DECIMAL,
	str_producto_proveedor VARCHAR,
	str_producto_estado VARCHAR DEFAULT 'ACTIVO',
	dt_fecha_creacion TIMESTAMP DEFAULT NOW(),
	CONSTRAINT ck_producto_estado check (str_producto_estado='ACTIVO' OR str_producto_estado='INACTIVO')
);


INSERT INTO inventario.productos(
	str_producto_codigo,
	str_producto_nombre,
	int_producto_cantidad,
	str_producto_marca,
	int_producto_precio,
	str_producto_proveedor
)
VALUES
('LDR78','Licuadora', 5, 'OSTER', 78.85, 'Importadora Oster'),
('SND12','Sanduchera', 10, 'UMCO', 22.50, 'Importadora Umco'),
('RFG47','Refrigeradora', 12, 'INDURAMA', 125.40, 'Importadora Mtx'),
('HRN32','Horno', 70, 'IMACO', 12.75, 'Importdora Imaco'),
('PLN41','Plancha', 50, 'ELECTROLUX', 12.75, 'Importdora el Regalo'),
('SCR45','Secadora', 34, 'PRIMA', 30.20, 'Importdora Oster'),
('MRN','Microondas', 24, 'INDURAMA', 80.95, 'Importdora el Regalo'),
('LVR17','Lavadora', 12, 'WHIRLPOOL', 725.40, 'Importdora Alessa');

SELECT * FROM inventario.productos

CREATE TABLE IF NOT EXISTS inventario.categorias(
	int_categoria_id SERIAL NOT NULL,
	str_categoria_descripcion TEXT
);

ALTER TABLE inventario.categorias
ADD CONSTRAINT unique_categoria_id UNIQUE (int_categoria_id);