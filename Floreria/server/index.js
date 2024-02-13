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
    database:"floreria"
});

app.post("/create",(req,res)=>{

    const Nombre = req.body.Nombre;
    const Especie = req.body.Especie;
    const Fecha_Ger = req.body.Fecha_Ger;
    const Fecha_Ven = req.body.Fecha_Ven;
    const Stock = req.body.Stock;
    const Tamaño = req.body.Tamaño;
    const Precio = req.body.Precio;
    const Estacion = req.body.Estacion;
    const Luz = req.body.Luz ? 1 : 0;
    const Sombra = req.body.Sombra ? 1 : 0;

    db.query('INSERT INTO flor (Nombre, Especie, Fecha_germinacion, Fecha_vencimiento, Stock, Tamaño, Precio, Estacion, Luz, Sombra) VALUES(?,?,?,?,?,?,?,?,?,?)',
    [Nombre,Especie,Fecha_Ger,Fecha_Ven,Stock,Tamaño,Precio,Estacion,Luz,Sombra],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Flor registrada con exito");
        }
    }
    );
});

app.get("/flor", (req, res) => {
    db.query('SELECT Flor_ID, Nombre, Especie, DATE_FORMAT(Fecha_germinacion, "%Y-%m-%d") AS Fecha_Ger, DATE_FORMAT(Fecha_vencimiento, "%Y-%m-%d") AS Fecha_Ven, Stock, Tamaño, Precio, Estacion, Luz, Sombra FROM flor',
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
    const Nombre = req.body.Nombre;
    const Especie = req.body.Especie;
    const Fecha_Ger = req.body.Fecha_Ger; // No es necesario convertir la fecha
    const Fecha_Ven = req.body.Fecha_Ven;
    const Stock = req.body.Stock;
    const Tamaño = req.body.Tamaño;
    const Precio = req.body.Precio;
    const Estacion = req.body.Estacion;
    const Luz = req.body.Luz ? 1 : 0; // Convertir booleano a 0 o 1
    const Sombra = req.body.Sombra ? 1 : 0; // Convertir booleano a 0 o 1
    const Flor_ID = req.body.Flor_ID;

    db.query('UPDATE flor SET Nombre=?, Especie=?, Fecha_germinacion=?, Fecha_vencimiento=?, Stock=?, Tamaño=?, Precio=?, Estacion=?, Luz=?, Sombra=? WHERE Flor_ID=?',
        [Nombre, Especie, Fecha_Ger, Fecha_Ven, Stock, Tamaño, Precio, Estacion, Luz, Sombra, Flor_ID],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send("Error al actualizar la flor");
            } else {
                res.send("Flor actualizada con éxito");
            }
        });
});
app.delete("/delete/:Flor_ID",(req,res)=>{
    const Flor_ID = req.params.Flor_ID;

    db.query('DELETE FROM flor WHERE Flor_ID=?',Flor_ID,
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