import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


function App() {


  const [DNI, setDNI] = useState("");
  const [Nombre, setNombre] = useState("");
  const [ApellidoP, setApellidoP] = useState("");
  const [ApellidoM, setApellidoM] = useState("");
  const [Edad, setEdad] = useState("");
  const [Genero, setGenero] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Nacionalidad, setNacionalidad] = useState("");
  const [Papel_protagonico, setPapel_protagonico] = useState("");


  const [editar, setEditar] = useState(false);

  const [List, setList] = useState([]);

  useEffect(() => {
    getDatos(); 
  }, []); 
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      DNI: DNI,
      Nombre: Nombre,
      ApellidoP: ApellidoP,
      ApellidoM: ApellidoM,
      Edad: Edad,
      Genero: Genero,
      Direccion: Direccion,
      Nacionalidad: Nacionalidad,
      Papel_protagonico: Papel_protagonico
    }).then(() => {
      getDatos();
      alert("Flor registrado");
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      DNI: DNI,
      Nombre: Nombre,
      ApellidoP: ApellidoP,
      ApellidoM: ApellidoM,
      Edad: Edad,
      Genero: Genero,
      Direccion: Direccion,
      Nacionalidad: Nacionalidad,
      Papel_protagonico: Papel_protagonico
    }).then(() => {
      getDatos();
      limpiar();
      
      alert("actualizado");
    });
  };

  const limpiar = () => {
      setDNI("");
      setNombre("");
      setApellidoP("");
      setApellidoM("");
      setEdad("");
      setGenero("");
      setDireccion("");
      setNacionalidad("");
      setPapel_protagonico("");
      setEditar(false);
  }

  const getDatos = () => {
    Axios.get("http://localhost:3001/actor").then((response) => {
      setList(response.data);
    });
  }

  const Editar = (val) => {
      setDNI(val.DNI);
      setNombre(val.Nombre);
      setApellidoP(val.ApellidoP);
      setApellidoM(val.ApellidoM);
      setEdad(val.Edad);
      setGenero(val.Genero);
      setDireccion(val.Direccion);
      setNacionalidad(val.Nacionalidad);
      setPapel_protagonico(val.Papel_protagonico);
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
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" value={Nombre} aria-label="Username" aria-describedby="basic-addon1" />
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
            <span className="input-group-text" id="basic-addon1">Genero</span>
            <input type="number"
              onChange={(event) => {
                setGenero(event.target.value);
              }}
              className="form-control" value={Genero} aria-label="Username" aria-describedby="basic-addon1" />
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
            <span className="input-group-text" id="basic-addon1">Papel protagonico</span>
            <input type="text"
              onChange={(event) => {
                setPapel_protagonico(event.target.value);
              }}
              className="form-control" value={Papel_protagonico} aria-label="Username" aria-describedby="basic-addon1" />
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
            <th scope="col">Nombre</th>
            <th scope="col">Apellido Paterno</th>
            <th scope="col">Apellido Materno</th>
            <th scope="col">Edad</th>
            <th scope="col">Genero</th>
            <th scope="col">Direccion</th>
            <th scope="col">Nacionalidad</th>
            <th scope="col">Papel_protagonico</th>
            <th scope="col">Acciones</th>

          </tr>
        </thead>
        <tbody>

        {
  List.map((val, key) => {
    return <tr key={val.DNI}>
      <th scope="row"> {val.DNI} </th>
      <td> {val.Nombre} </td>
      <td> {val.ApellidoP} </td>
      <td> {val.ApellidoM} </td> 
      <td> {val.Edad} </td>
      <td> {val.Genero} </td>
      <td> {val.Direccion} </td>
      <td> {val.Nacionalidad} </td>
      <td> {val.Papel_protagonico} </td>
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

