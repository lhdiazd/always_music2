const { Pool } = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'always_music',
    password: '1234',
    port: 5432,
};

const pool = new Pool(config);

async function addStudent(args) {
    try {
        const [nombre, rut, curso, nivel] = args;
        const query = {
            text: 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)',
            values: [nombre, rut, curso, nivel],
        }
        await pool.query(query);
        console.log(`Estudiante ${nombre} agregado con éxito`);
    } catch (error) {
        console.error('Error al agregar estudiante:', error);
    } finally {
        pool.end();
    }
}

async function listStudents() {
    try {
        const query = {
            text: 'SELECT * FROM estudiantes',
            rowMode: 'array',
        }
        const result = await pool.query(query);
        console.log(result.rows);
    } catch (error) {
        console.error('Error al traer datos de estudiantes registrados', error);
    } finally {
        pool.end();
    }
}

async function findStudentByRut(args) {
    try {
        const rut = args[0];
        const query = {
            text: 'SELECT * FROM estudiantes WHERE rut=$1',
            values: [rut],
            rowMode: 'array',
        }

        const result = await pool.query(query);

        if (result.rows.length === 0) {
            console.log('No se encontró ningún estudiante con el RUT:', rut);
        } else {
            console.log('Estudiante encontrado:', result.rows);
        }
    } catch (error) {
        console.error('Error al buscar el rut', error);
    } finally {
        pool.end();
    }
}

async function updateStudent(args) {
    try {
        const [nombre, rut, curso, nivel] = args;
        const query = {
            text: 'UPDATE estudiantes SET nombre=$1, curso=$3, nivel=$4 WHERE rut=$2 RETURNING *',
            values: [nombre, rut, curso, nivel],
            rowMode: 'array',
        }

        const result = await pool.query(query);

        if (result.rowCount === 0) {
            console.log(`No se encontró ningún estudiante con el RUT ${rut}.`);
        } else {
            console.log(`Estudiante ${nombre} actualizado con éxito`);
            
        }
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
    } finally {
        pool.end();
    }
}

async function deleteStudentByRut(args) {
    try {
        const rut = args[0];
        const query = {
            text: 'DELETE FROM estudiantes WHERE rut=$1 RETURNING *',
            values: [rut],
            rowMode: 'array',
        }
        const result = await pool.query(query);

        if (result.rowCount === 0) {
            console.log(`No se encontró ningún estudiante con el RUT ${rut}. No se realizó ninguna eliminación.`);
        } else {
            console.log(`Estudiante con RUT ${rut} eliminado con éxito`);
            console.log('Datos del estudiante eliminado:', result.rows);
        }
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
    } finally {
        pool.end();
    }
}



const command = process.argv[2];
const args = process.argv.slice(3);


switch (command) {
    case 'nuevo':
        addStudent(args);
        break;
    case 'consulta':
        listStudents();
        break;
    case 'rut':
        findStudentByRut(args);
        break;
    case 'actualizar':
        updateStudent(args);
        break;
    case 'eliminar':
        deleteStudentByRut(args);
        break;
    default:
        console.log('Error de comando');

}