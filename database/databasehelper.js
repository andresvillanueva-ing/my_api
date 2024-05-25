const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('database.db');

db.serialize(()=>{
  db.run(
    "CREATE TABLE IF NO EXISTS estudiantes (id  INTEGER PRIMARY KEY AUTOINCREMENT, codigo INTEGER, nombre TEXT, imagen BLOB)");
});

db.serialize(()=>{
  db.run("INSERT INTO estudiantes(codigo, nombre, imagen) VALUE(?,?,?)", ['7552120003', 'andres felipe villanueva', '/asset/user.jpg']);
});

db.close((err)=>{
  if(err){
    return console.error(err.message);
  }else{
    console.log('Base de dato cerrada con exito')
  }
});

db.serialize(()=>{
  lista = db.all("SELECT * FROM estudiantes");
  console.log(lista);
});
