import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las publicaciones:', error);
      });
  }, []);

  const handleNextPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        {posts.length > 0 && (
          <div className="card">
            <div className="card-header">
                <h1 className="display-4 text-center mb-4">ULTIMAS NOTICIAS</h1>
            </div>
            <div className="card-body">
              <div className="alert alert-primary" role="alert">
                <h2 className="card-title">{posts[currentPostIndex].titulo}</h2>
                <p className="card-text">{posts[currentPostIndex].texto}</p>
              </div>
              <h3 className="mt-4">Comentarios:</h3>
              <ul className="list-group mt-3">
                {posts[currentPostIndex].comentarios.map(comment => (
                  <li key={comment._id} className="list-group-item">
                    <strong>{comment.usuario}</strong>: {comment.texto}
                    <div className="text-muted">{formatDate(comment.fecha)}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleNextPost}>Siguiente Publicación</button>
        </div>
      </div>
    </div>
  );
};

export default App;
