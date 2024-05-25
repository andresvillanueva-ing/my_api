const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const api = express();
const port = 3000;

// Abrir la conexión a la base de datos
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Crear la tabla 'estudiantes' si no existe
db.serialize(() => {
    db.run(
        "CREATE TABLE IF NOT EXISTS estudiantes (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo INTEGER, nombre TEXT, imagen BLOB)",
        (err) => {
            if (err) {
                console.error('Error al crear la tabla:', err.message);
            } else {
                console.log('Tabla estudiantes creada o ya existe');
            }
        }
    );

    // Inserción de un estudiante (asegúrate de no insertar duplicados en cada reinicio)
    db.run("INSERT INTO estudiantes (codigo, nombre, imagen) VALUES (?, ?, ?)", ['7552120003', 'andres felipe villanueva', '/asset/user.jpg'], 
    (err) => {
        if (err) {
            console.error('Error al insertar estudiante:', err.message);
        } else {
            console.log('Estudiante insertado');
        }
    });
});

// Endpoint para obtener todos los estudiantes
api.get('/Estudiantes', (req, res) => {
    db.all("SELECT * FROM estudiantes", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Iniciar el servidor
api.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Cerrar la base de datos cuando el proceso termine
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la base de datos:', err.message);
        } else {
            console.log('Base de datos cerrada con éxito');
        }
        process.exit(0);
    });
});
