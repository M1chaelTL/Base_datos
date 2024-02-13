import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [Flor_ID, setFlor_ID] = useState(0)

  const [Nombre, setNombre] = useState("");
  const [Especie, setEspecie] = useState("");
  const [Fecha_Ger, setFecha_Ger] = useState("");
  const [Fecha_Ven, setFecha_Ven] = useState("");
  const [Stock, setStock] = useState("");
  const [Tamaño, setTamaño] = useState("");
  const [Precio, setPrecio] = useState("");
  const [Estacion, setEstacion] = useState("");
  const [Luz, setLuz] = useState("");
  const [Sombra, setSombra] = useState("");



  const [editar, setEditar] = useState(false);

  const [FlorList, setFlores] = useState([]);

  useEffect(() => {
    getFlores(); 
  }, []); 
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Especie: Especie,
      Fecha_Ger: Fecha_Ger,
      Fecha_Ven: Fecha_Ven,
      Stock: Stock,
      Tamaño: Tamaño,
      Precio: Precio,
      Estacion: Estacion,
      Luz: Luz,
      Sombra: Sombra
    }).then(() => {
      getFlores();
      alert("Flor registrado");
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      Nombre: Nombre,
      Especie: Especie,
      Fecha_Ger: Fecha_Ger,
      Fecha_Ven: Fecha_Ven,
      Stock: Stock,
      Tamaño: Tamaño,
      Precio: Precio,
      Estacion: Estacion,
      Luz: Luz,
      Sombra: Sombra,
      Flor_ID: Flor_ID
    }).then(() => {
      getFlores();
      limpiar();
      
      alert("actualizado");
    });
  };

  const limpiar = () => {
    setNombre("");
    setEspecie("");
    setFecha_Ger("");
    setFecha_Ven("");
    setStock("");
    setTamaño("");
    setPrecio("");
    setEstacion("");
    setLuz("");
    setSombra("");
    setEditar(false);
  }

  const getFlores = () => {
    Axios.get("http://localhost:3001/flor").then((response) => {
      setFlores(response.data);
    });
  }

  const editarFlor = (val) => {
    setNombre(val.Nombre);
    setEspecie(val.Especie);
    setFecha_Ger(val.Fecha_Ger);
    setFecha_Ven(val.Fecha_Ven);
    setStock(val.Stock);
    setTamaño(val.Tamaño);
    setPrecio(val.Precio);
    setEstacion(val.Estacion);
    setLuz(val.Luz);
    setSombra(val.Sombra);
    setFlor_ID(val.Flor_ID);
    setEditar(true);

  }
  const eliminar = (Flor_ID) => {
    Axios.delete(`http://localhost:3001/delete/${Flor_ID}`).then(() => {
      getFlores();
      limpiar();
      alert("eliminado");
    });
  };


  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          REGISTRO
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" value={Nombre} aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Especie</span>
            <input type="text"
              onChange={(event) => {
                setEspecie(event.target.value);
              }}
              className="form-control" value={Especie} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Fecha de germinacion</span>
            <input type="date"
              onChange={(event) => {
                setFecha_Ger(event.target.value);
              }}
              className="form-control" value={Fecha_Ger} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Fecha de vencimiento</span>
            <input type="date"
              onChange={(event) => {
                setFecha_Ven(event.target.value);
              }}
              className="form-control" value={Fecha_Ven} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Stock</span>
            <input type="number"
              onChange={(event) => {
                setStock(event.target.value);
              }}
              className="form-control" value={Stock} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Tamaño</span>
            <input type="number"
              onChange={(event) => {
                setTamaño(event.target.value);
              }}
              className="form-control" value={Tamaño} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Precio</span>
            <input type="number"
              onChange={(event) => {
                setPrecio(event.target.value);
              }}
              className="form-control" value={Precio} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Estacion</span>
            <input type="text"
              onChange={(event) => {
                setEstacion(event.target.value);
              }}
              className="form-control" value={Estacion} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Luz</span>
            <input type="numerx"
              onChange={(event) => {
                setLuz(event.target.value);
              }}
              className="form-control" value={Luz} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Sombra</span>
            <input type="number"
              onChange={(event) => {
                setSombra(event.target.value);
              }}
              className="form-control" value={Sombra} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-body-muted">
          {
            editar ?
              <div>
                <button className='btn btn-warning' onClick={update}>Actualizar</button>
                <button className='btn btn-info' onClick={limpiar}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>

          }
        </div>
      </div><br />
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">DNI</th>
            <th scope="col">Nombre</th>
            <th scope="col">Especie</th>
            <th scope="col">Fecha_germinacion</th>
            <th scope="col">Fecha_vencimiento</th>
            <th scope="col">Stock</th>
            <th scope="col">Tamaño</th>
            <th scope="col">Precio</th>
            <th scope="col">Estacion</th>
            <th scope="col">Luz</th>
            <th scope="col">sombra</th>
            <th scope="col">Acciones</th>

          </tr>
        </thead>
        <tbody>

        {
  FlorList.map((val, key) => {
    return <tr key={val.Flor_ID}>
      <th scope="row"> {val.Flor_ID} </th>
      <td> {val.Nombre} </td>
      <td> {val.Especie} </td>
      <td> {val.Fecha_Ger} </td> 
      <td> {val.Fecha_Ven} </td>
      <td> {val.Stock} </td>
      <td> {val.Tamaño} </td>
      <td> {val.Precio} </td>
      <td> {val.Estacion} </td>
      <td> {val.Luz} </td>
      <td> {val.Sombra} </td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button"
            onClick={() => {
              editarFlor(val);
            }}
            className="btn btn-info">Editar</button>
          <button type="button" onClick={() => {
            eliminar(val.Flor_ID)
          }} className="btn btn-danger">Eliminar</button>
        </div>
      </td>
    </tr>
  })
}
        </tbody>
      </table>
    </div>
  );
}

export default App;

