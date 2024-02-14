import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


function App() {


  const [DNI, setDNI] = useState("");
  const [Nombres, setNombres] = useState("");
  const [ApellidoP, setApellidoP] = useState("");
  const [ApellidoM, setApellidoM] = useState("");
  const [Edad, setEdad] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Nacionalidad, setNacionalidad] = useState("");
  const [Cantidad_mascotas, setCantidad_mascotas] = useState("");


  const [editar, setEditar] = useState(false);

  const [List, setList] = useState([]);

  useEffect(() => {
    getDatos(); 
  }, []); 
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      DNI: DNI,
      Nombres: Nombres,
      ApellidoP: ApellidoP,
      ApellidoM: ApellidoM,
      Edad: Edad,
      Direccion: Direccion,
      Nacionalidad: Nacionalidad,
      Cantidad_mascotas: Cantidad_mascotas
    }).then(() => {
      getDatos();
      limpiar();
      alert("Flor registrado");
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      DNI: DNI,
      Nombres: Nombres,
      ApellidoP: ApellidoP,
      ApellidoM: ApellidoM,
      Edad: Edad,
      Direccion: Direccion,
      Nacionalidad: Nacionalidad,
      Cantidad_mascotas: Cantidad_mascotas
    }).then(() => {
      getDatos();
      limpiar();
      alert("actualizado");
    });
  };

  const limpiar = () => {
      setDNI("");
      setNombres("");
      setApellidoP("");
      setApellidoM("");
      setEdad("");
      setDireccion("");
      setNacionalidad("");
      setCantidad_mascotas("");
      setEditar(false);
  }

  const getDatos = () => {
    Axios.get("http://localhost:3001/cliente").then((response) => {
      setList(response.data);
    });
  }

  const Editar = (val) => {
      setDNI(val.DNI);
      setNombres(val.Nombres);
      setApellidoP(val.ApellidoP);
      setApellidoM(val.ApellidoM);
      setEdad(val.Edad);
      setDireccion(val.Direccion);
      setNacionalidad(val.Nacionalidad);
      setCantidad_mascotas(val.Papel_protagonico);
      setEditar(true);

  }
  const eliminar = (ID) => {
    Axios.delete(`http://localhost:3001/delete/${ID}`).then(() => {
      getDatos();
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
            <span className="input-group-text" id="basic-addon1">DNI</span>
            <input type="text"
              onChange={(event) => {
                setDNI(event.target.value);
              }}
              className="form-control" value={DNI} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombres</span>
            <input type="text"
              onChange={(event) => {
                setNombres(event.target.value);
              }}
              className="form-control" value={Nombres} aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Apellido Paterno</span>
            <input type="text"
              onChange={(event) => {
                setApellidoP(event.target.value);
              }}
              className="form-control" value={ApellidoP} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Apellido Materno</span>
            <input type="text"
              onChange={(event) => {
                setApellidoM(event.target.value);
              }}
              className="form-control" value={ApellidoM} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input type="number"
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control" value={Edad} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Direccion</span>
            <input type="text"
              onChange={(event) => {
                setDireccion(event.target.value);
              }}
              className="form-control" value={Direccion} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nacionalidad</span>
            <input type="text"
              onChange={(event) => {
                setNacionalidad(event.target.value);
              }}
              className="form-control" value={Nacionalidad} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cantidad de mascotas</span>
            <input type="number"
              onChange={(event) => {
                setCantidad_mascotas(event.target.value);
              }}
              className="form-control" value={Cantidad_mascotas} aria-label="Username" aria-describedby="basic-addon1" />
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
            <th scope="col">Nombres</th>
            <th scope="col">Apellido Paterno</th>
            <th scope="col">Apellido Materno</th>
            <th scope="col">Edad</th>
            <th scope="col">Direccion</th>
            <th scope="col">Nacionalidad</th>
            <th scope="col">Cantidad_mascotas</th>
            <th scope="col">Acciones</th>

          </tr>
        </thead>
        <tbody>

        {
  List.map((val, key) => {
    return <tr key={val.DNI}>
      <th scope="row"> {val.DNI} </th>
      <td> {val.Nombres} </td>
      <td> {val.ApellidoP} </td>
      <td> {val.ApellidoM} </td> 
      <td> {val.Edad} </td>
      <td> {val.Direccion} </td>
      <td> {val.Nacionalidad} </td>
      <td> {val.Cantidad_mascotas} </td>
      <td>
        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button"
            onClick={() => {
              Editar(val);
            }}
            className="btn btn-info">Editar</button>
          <button type="button" onClick={() => {
            eliminar(val.DNI)
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

