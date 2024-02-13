import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  const [DNI, setDNI] = useState("");
  const [Nombres, setNombres] = useState("");
  const [ApellidoP, setApellidoP] = useState("");
  const [ApellidoM, setApellidoM] = useState("");
  const [Fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [Genero, setGenero] = useState("");
  const [Paciente_ID, setPaciente_ID] = useState(0);
  const [Peso, setPeso] = useState("");
  const [Altura, setAltura] = useState("");
  const [Direccion, setDireccion] = useState("");

  
  const [editar, setEditar] = useState(false);

  const [List, setList] = useState([]);

  useEffect(() => {
    getPaciente(); 
  }, []); 
  
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      DNI:DNI,
      Nombres:Nombres,
      ApellidoP:ApellidoP,
      ApellidoM:ApellidoM,
      Fecha_nacimiento:Fecha_nacimiento,
      Genero:Genero,
      Peso:Peso,
      Altura:Altura,
      Direccion:Direccion
    }).then(() => {
      getPaciente();
      alert("Registrado");
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      DNI:DNI,
      Nombres:Nombres,
      ApellidoP:ApellidoP,
      ApellidoM:ApellidoM,
      Fecha_nacimiento:Fecha_nacimiento,
      Genero:Genero,
      Paciente_ID:Paciente_ID,
      Peso:Peso,
      Altura:Altura,
      Direccion:Direccion
    }).then(() => {
      getPaciente();
      limpiar();
      
      alert("actualizado");
    });
  };

  const limpiar = () => {
    setDNI("");
    setNombres("");
    setApellidoP("");
    setApellidoM("");
    setFecha_nacimiento("");
    setGenero("");
    setPaciente_ID("");
    setPeso("");
    setAltura("");
    setDireccion("");
    setEditar(false);
  }

  const getPaciente = () => {
    Axios.get("http://localhost:3001/paciente")
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }

  const editarPaciente = (val) => {
    setDNI(val.DNI);
    setNombres(val.Nombres);
    setApellidoP(val.ApellidoP);
    setApellidoM(val.ApellidoM);
    setFecha_nacimiento(val.Fecha_nacimiento);
    setGenero(val.Genero);
    setPeso(val.Peso);
    setAltura(val.Altura);
    setDireccion(val.Direccion);
    setPaciente_ID(val.Paciente_ID);
    setEditar(true);
    

  }
  const eliminar = (DNI) => {
    Axios.delete(`http://localhost:3001/delete/${DNI}`).then(() => {
      getPaciente();
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
            <span className="input-group-text" id="basic-addon1">Fecha de nacimiento</span>
            <input type="date"
              onChange={(event) => {
                setFecha_nacimiento(event.target.value);
              }}
              className="form-control" value={Fecha_nacimiento} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Genero</span>
            <input type="text"
              onChange={(event) => {
                setGenero(event.target.value);
              }}
              className="form-control" value={Genero} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Peso</span>
            <input type="number"
              onChange={(event) => {
                setPeso(event.target.value);
              }}
              className="form-control" value={Peso} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Altura</span>
            <input type="number"
              onChange={(event) => {
                setAltura(event.target.value);
              }}
              className="form-control" value={Altura} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Direccion</span>
            <input type="text"
              onChange={(event) => {
                setDireccion(event.target.value);
              }}
              className="form-control" value={Direccion} aria-label="Username" aria-describedby="basic-addon1" />
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
            <th scope="col">Nombres</th>
            <th scope="col">Apellido Paterno</th>
            <th scope="col">Apellido Materno</th>
            <th scope="col">Fecha_Nacimiento</th>
            <th scope="col">Genero</th>
            <th scope="col">Peso</th>
            <th scope="col">Altura</th>
            <th scope="col">Direccion</th>
            <th scope="col">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {
          List.map((val, key) => {
            return <tr key={val.Paciente_ID}>
              <th scope="row"> {val.Paciente_ID} </th>
                  <td>{val.DNI}</td>
                  <td>{val.Nombres}</td>
                  <td>{val.ApellidoP}</td>
                  <td>{val.ApellidoM}</td>
                  <td>{val.Fecha_nacimiento}</td>
                  <td>{val.Genero}</td>
                  <td>{val.Peso}</td>
                  <td>{val.Altura}</td>
                  <td>{val.Direccion}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                  <button type="button"
                    onClick={() => {
                      editarPaciente(val);
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


