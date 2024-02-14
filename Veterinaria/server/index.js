const express = require("express");
const app = express();
const mysql = require("mysql");

const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"123456",
    database:"veterinaria"
});

app.post("/create",(req,res)=>{
    const DNI = req.body.DNI;
    const Nombres = req.body.Nombres;
    const ApellidoP = req.body.ApellidoP;
    const ApellidoM = req.body.ApellidoM;
    const Edad = req.body.Edad;
    const Direccion = req.body.Direccion;
    const Nacionalidad = req.body.Nacionalidad;
    const Cantidad_mascotas = req.body.Cantidad_mascotas;


    db.query('INSERT INTO cliente (DNI, Nombres, ApellidoP, ApellidoM, Edad, Direccion, Nacionalidad, Cantidad_mascotas) VALUES (?,?,?,?,?,?,?,?)',
    [DNI, Nombres, ApellidoP, ApellidoM, Edad, Direccion, Nacionalidad, Cantidad_mascotas],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Flor registrada con exito");
        }
    }
    );
});

app.get("/cliente", (req, res) => {
    db.query('SELECT * FROM cliente',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.put("/update", (req, res) => {
    const DNI = req.body.DNI;
    const Nombres = req.body.Nombres;
    const ApellidoP = req.body.ApellidoP;
    const ApellidoM = req.body.ApellidoM;
    const Edad = req.body.Edad;
    const Direccion = req.body.Direccion;
    const Nacionalidad = req.body.Nacionalidad;
    const Cantidad_mascotas = req.body.Cantidad_mascotas;

    db.query('UPDATE cliente SET  Nombres=?, ApellidoP=?, ApellidoM=?, Edad=?, Direccion=?, Nacionalidad=?, Cantidad_mascotas=? WHERE DNI=?',
        [Nombres, ApellidoP, ApellidoM, Edad, Direccion, Nacionalidad, Cantidad_mascotas, DNI],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("Error al actualizar la flor");
            } else {
                res.send("Flor actualizada con éxito");
            }
        });
});
app.delete("/delete/:DNI",(req,res)=>{
    const DNI = req.params.DNI;

    db.query('CALL EliminarCliente(?)',DNI,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});
    app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
})