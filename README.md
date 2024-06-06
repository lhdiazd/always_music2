# Sistema de Gestión de Estudiantes - Always Music

## Configuración de la Base de Datos

Antes de iniciar este desafío, debes crear una base de datos y una tabla con las siguientes columnas:

```sql

-- Crear base de datos

CREATE DATABASE always_music;

-- Crear tabla estudiantes

CREATE TABLE estudiantes (
    nombre varchar(100) NOT NULL,
    rut varchar(12) NOT NULL,
    curso varchar(50),
    nivel varchar(50)
);

-- Poblar base de datos

INSERT INTO estudiantes (nombre, rut, curso, nivel)
VALUES
    ('Juan Perez', '12345678-9', 'Matemáticas', 'Avanzado'),
    ('María González', '98765432-1', 'Historia', 'Básico'),
    ('Pedro Ramirez', '45678901-2', 'Ciencias', 'Intermedio'),
    ('Luisa Martínez', '23456789-0', 'Literatura', 'Avanzado'),
    ('Carlos López', '89012345-6', 'Arte', 'Básico');
```
## Uso del sistema

Por medio de la terminal, ingresamos los siguientes comandos:

#### Agregar un estudiante:

```cmd
node index.js nuevo <nombre> <rut> <curso> <nivel>
```
#### Listar todos los estudiantes:

```cmd
node index.js consulta
```

#### Buscar un estudiante por RUT:

```cmd
node index.js rut <rut>
```

#### Actualizar la información de un estudiante:

```cmd
node index.js actualizar <nombre> <rut> <curso> <nivel>
```

#### Eliminar un estudiante por RUT:

```cmd
node index.js eliminar <rut>
```
