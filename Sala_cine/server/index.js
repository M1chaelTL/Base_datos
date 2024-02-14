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
    database:"sala_cine"
});

app.post("/create",(req,res)=>{
    const DNI = req.body.DNI;
    const Nombre = req.body.Nombre;
    const ApellidoP = req.body.ApellidoP;
    const ApellidoM = req.body.ApellidoM;
    const Edad = req.body.Edad;
    const Genero = req.body.Genero;
    const Direccion = req.body.Direccion;
    const Nacionalidad = req.body.Nacionalidad;
    const Papel_protagonico = req.body.Papel_protagonico;


    db.query('CALL AgregarActorPrincipal(?,?,?,?,?,?,?,?,?)',
    [DNI, Nombre, ApellidoP, ApellidoM, Edad, Genero, Direccion, Nacionalidad, Papel_protagonico],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Flor registrada con exito");
        }
    }
    );
});

app.get("/actor", (req, res) => {
    db.query('CALL MostrarActoresPrincipales()', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener pacientes");
        } else {
            if (result && result.length > 0) {
                const data = result[0]; 
                res.send(data);
            } else {
                res.send([]);
            }
        }
    });
});

app.put("/update", (req, res) => {
    const DNI = req.body.DNI;
    const Nombre = req.body.Nombre;
    const ApellidoP = req.body.ApellidoP;
    const ApellidoM = req.body.ApellidoM;
    const Edad = req.body.Edad;
    const Genero = req.body.Genero;
    const Direccion = req.body.Direccion;
    const Nacionalidad = req.body.Nacionalidad;
    const Papel_protagonico = req.body.Papel_protagonico;

    db.query('CALL ActualizarActorPrincipal(?,?,?,?,?,?,?,?,?)',
        [DNI, Nombre, ApellidoP, ApellidoM, Edad, Genero, Direccion, Nacionalidad, Papel_protagonico],
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

    db.query('CALL EliminarActorPrincipal(?)',DNI,
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