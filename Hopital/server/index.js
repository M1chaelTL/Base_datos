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
    database:"hospital"
});

app.post("/create",(req,res)=>{
    const DNI = req.body.DNI;
    const Nombres = req.body.Nombres;
    const ApellidoP = req.body.ApellidoP;
    const ApellidoM = req.body.ApellidoM;
    const Fecha_nacimiento = req.body.Fecha_nacimiento;
    const Genero = req.body.Genero;
    const Peso = req.body.Peso;
    const Altura = req.body.Altura;
    const Direccion = req.body.Direccion;

    db.query('CALL AgregarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [DNI, Nombres, ApellidoP, ApellidoM, Fecha_nacimiento, Genero, Peso, Altura, Direccion],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Registro con exito");
        }
    }
    );
});

app.get("/paciente", (req, res) => {
    db.query('CALL MostrarPaciente()', (err, result) => {
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
    const Nombres = req.body.Nombres;
    const ApellidoP = req.body.ApellidoP;
    const ApellidoM = req.body.ApellidoM;
    const Fecha_nacimiento = req.body.Fecha_nacimiento;
    const Genero = req.body.Genero;
    const Peso = req.body.Peso;
    const Altura = req.body.Altura;
    const Direccion = req.body.Direccion;

    db.query('CALL EditarPaciente(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [DNI, Nombres, ApellidoP, ApellidoM, Fecha_nacimiento, Genero, Peso, Altura, Direccion],
    (err, result) => {

        if (err) {
            console.log(err);
            res.send("Error al actualizar ");
        } else {
            res.send("Actualización con éxito");
        }
    }
);
});
app.delete("/delete/:DNI",(req,res)=>{
    const DNI = req.params.DNI;

    db.query('CALL EliminarPaciente(?)',DNI,
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